import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // Fail-fast: ne pas relancer automatiquement les requêtes.
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
}
