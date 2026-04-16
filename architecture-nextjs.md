# Architecture Next.js — Server Actions, Axios, React Query, Middleware

> Contexte : espace client full CSR avec session HTTP-only pour IDs sensibles.

---

## Vue d'ensemble des couches

```
Middleware (Edge)
      ↓
Couche HTTP — instance Axios configurée
      ↓
Services — fonctions métier typées
      ↙              ↘
Server Actions     React Query (client)
      ↘              ↙
   Composants UI (Client Components)
```

---

## Ce que chaque couche connaît

| Couche | Connaît | Ne connaît pas |
|---|---|---|
| Composants | Hooks, types, ce qui s'affiche | Axios, endpoints, sessionId |
| Hooks | `useQuery` / `useMutation`, Server Actions | Services directement |
| Server Actions | Cookies HTTP-only, services | React Query |
| Services | Instance Axios, endpoints | Cookies, composants |
| Instance Axios | baseURL, interceptors | Métier |
| Middleware | Auth, redirections | Tout le reste |

---

## 1. Instance Axios — configurer une seule fois

```ts
// lib/http/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// Injecte le token automatiquement
apiClient.interceptors.request.use((config) => {
  const token = getToken() // depuis cookie ou store
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Gestion des erreurs centralisée
apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) redirectToLogin()
    return Promise.reject(normalizeError(err))
  }
)
```

**Règle :** seule cette instance connaît Axios. Tous les services l'importent.

---

## 2. Services — fonctions métier typées

```ts
// services/quotes.service.ts
import { apiClient } from '@/lib/http/client'
import type { Quote, CreateQuoteDTO } from '@/types/quote'

export const quotesService = {
  getAll: () => apiClient.get<Quote[]>('/quotes'),
  getById: (id: string) => apiClient.get<Quote>(`/quotes/${id}`),
  create: (dto: CreateQuoteDTO) => apiClient.post<Quote>('/quotes', dto),
  initSession: (params: TravelParams) => apiClient.post('/quotes/session', params),
  getQuote: (sessionId: string) => apiClient.get(`/quotes/${sessionId}`),
}
```

**Règle :** seule cette couche connaît les endpoints. Ni les actions ni les composants ne touchent directement Axios.

---

## 3. QueryClient — configurer une seule fois

```ts
// lib/query/client.ts
import { QueryClient } from '@tanstack/react-query'

export const makeQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

---

## 4. Server Actions — session HTTP-only

Les Server Actions sont le **seul pont** entre le client et les IDs sensibles. Le cookie HTTP-only ne peut être lu ni écrit que côté serveur — le navigateur ne voit jamais les IDs.

```ts
// actions/session.actions.ts
'use server'
import { cookies } from 'next/headers'
import { quotesService } from '@/services/quotes.service'

export async function initQuoteSession(params: TravelParams) {
  const cookieStore = await cookies()

  // L'API retourne un sessionId sensible
  const { sessionId, quoteData } = await quotesService.initSession(params)

  // Stocké en HTTP-only — le client ne le verra jamais
  cookieStore.set('quote_session_id', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  })

  // On retourne uniquement ce que le front doit afficher
  return { quoteData }
}

export async function getQuoteWithSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('quote_session_id')?.value

  if (!sessionId) throw new Error('Session expirée')

  // L'ID est injecté ici, le front n'en a jamais besoin
  return quotesService.getQuote(sessionId)
}
```

---

## 5. Hooks — interface du front

```ts
// hooks/use-quote-session.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { initQuoteSession, getQuoteWithSession } from '@/actions/session.actions'

export const useInitQuoteSession = () =>
  useMutation({
    mutationFn: initQuoteSession,
    // onSuccess → naviguer vers l'étape suivante
  })

export const useQuoteSession = () =>
  useQuery({
    queryKey: ['quote-session'],
    queryFn: getQuoteWithSession,
  })
```

```ts
// hooks/use-quotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quotesService } from '@/services/quotes.service'

export const useQuotes = () =>
  useQuery({
    queryKey: ['quotes'],
    queryFn: quotesService.getAll,
  })

export const useCreateQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: quotesService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['quotes'] }),
  })
}
```

---

## 6. Composants — ignorants des détails

```tsx
// components/QuoteList.tsx
import { useQuotes } from '@/hooks/use-quotes'

export function QuoteList() {
  const { data, isLoading, error } = useQuotes()
  // Ne sait pas qu'Axios existe
  // Ne sait pas que sessionId existe
}
```

---

## Quand passer par une Server Action vs React Query

| Opération | Passe par |
|---|---|
| Données publiques (tarifs, pays…) | `useQuery` → service → Axios |
| Init session / étapes sensibles | `useMutation` → Server Action → cookie |
| Mutation avec ID confidentiel | Server Action (lit le cookie, appelle l'API) |
| Opérations serveur (PDF, email) | Server Action |
| CRUD classique sans sensibilité | `useMutation` → service → Axios |

---

## Structure de dossiers

```
src/
├── lib/
│   ├── http/
│   │   └── client.ts          ← instance Axios (configurer une fois)
│   └── query/
│       └── client.ts          ← QueryClient factory
├── services/
│   ├── quotes.service.ts
│   └── insurance.service.ts
├── actions/
│   └── session.actions.ts     ← Server Actions + cookies HTTP-only
├── types/
│   └── quote.ts               ← types + zod schemas partagés
├── hooks/
│   ├── use-quotes.ts
│   └── use-quote-session.ts
└── middleware.ts
```

---

## Règles d'or

- **Seuls les services** connaissent Axios et les endpoints
- **Seules les Server Actions** lisent et écrivent les cookies HTTP-only
- **Seul le QueryClient** définit les stratégies de cache
- **Les composants** ne connaissent que les hooks et les types
- Les **types Zod** sont partagés entre client et serveur pour la validation
