import type { LucideIcon } from "lucide-react";
import {
  Car,
  HeartPulse,
  Home,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";

import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";

import { quoteProductPathFromId } from "./quote-product-routes";

export type QuoteProductStatus = "active" | "coming_soon";

export type QuoteProductBadge =
  | "Souscription en ligne"
  | "Devis instantané"
  | "Bientôt";

export interface QuoteProductCatalogItem {
  id: QuoteSidebarProductId;
  /** Libellé court (nav, onglets). */
  navLabel: string;
  /** Titre affiché sur la carte hub. */
  title: string;
  /** Job to be done - une ligne. */
  job: string;
  /** Durée perçue du parcours. */
  durationLabel: string;
  badge: QuoteProductBadge;
  status: QuoteProductStatus;
  icon: LucideIcon;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

const CATALOG: QuoteProductCatalogItem[] = [
  {
    id: "travel",
    navLabel: "Assurance Voyage",
    title: "Assurance Voyage",
    job: "Partez serein avec une couverture adaptée à votre destination.",
    durationLabel: "Environ 3 min",
    badge: "Souscription en ligne",
    status: "active",
    icon: Plane,
    href: quoteProductPathFromId("travel"),
    imageSrc: "/images/hub/travel.png",
    imageAlt: "Couple à l'aéroport, prêt à partir",
  },
  {
    id: "auto",
    navLabel: "Assurance Automobile",
    title: "Assurance Automobile",
    job: "Obtenez votre prime selon votre véhicule et votre zone.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: Car,
    href: quoteProductPathFromId("auto"),
    imageSrc: "/images/hub/auto.png",
    imageAlt: "Véhicule en ville au coucher du soleil",
  },
  {
    id: "home",
    navLabel: "Multirisque habitation",
    title: "Multirisque habitation",
    job: "Protégez votre logement avec la formule adaptée à votre profil.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: Home,
    href: quoteProductPathFromId("home"),
    imageSrc: "/images/hub/home.png",
    imageAlt: "Maison familiale éclairée en fin de journée",
  },
  {
    id: "health",
    navLabel: "Assurance santé",
    title: "Assurance santé",
    job: "Composez la couverture santé de votre foyer en quelques clics.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: HeartPulse,
    href: quoteProductPathFromId("health"),
    imageSrc: "/images/hub/health.png",
    imageAlt: "Consultation familiale dans une clinique",
  },
  {
    id: "prevoyance",
    navLabel: "Prévoyance individuelle",
    title: "Prévoyance individuelle",
    job: "Anticipez l'avenir avec une prévoyance adaptée à votre situation.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: Shield,
    href: quoteProductPathFromId("prevoyance"),
    imageSrc: "/images/hub/prevoyance.png",
    imageAlt: "Parent et enfant marchant ensemble",
  },
  {
    id: "pet",
    navLabel: "Individuelle accidents",
    title: "Individuelle accidents",
    job: "Une protection individuelle contre les accidents du quotidien.",
    durationLabel: "Bientôt disponible",
    badge: "Bientôt",
    status: "coming_soon",
    icon: Sparkles,
    href: quoteProductPathFromId("pet"),
    imageSrc: "/images/hub/accidents.png",
    imageAlt: "Scène de vie quotidienne en ville",
  },
];

export const QUOTE_PRODUCT_CATALOG = CATALOG;

export const ACTIVE_QUOTE_PRODUCTS = CATALOG.filter((p) => p.status === "active");

export function getQuoteProductById(
  id: QuoteSidebarProductId,
): QuoteProductCatalogItem | undefined {
  return CATALOG.find((p) => p.id === id);
}

/** Entrées pour le menu « Obtenir devis » du header. */
export function getQuoteNavItems(): Pick<
  QuoteProductCatalogItem,
  "navLabel" | "href" | "status"
>[] {
  return CATALOG.map(({ navLabel, href, status }) => ({
    navLabel,
    href,
    status,
  }));
}
