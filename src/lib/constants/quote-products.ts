import type { LucideIcon } from "lucide-react";
import {
  Car,
  Cross,
  GraduationCap,
  HeartPulse,
  Home,
  Users,
  Plane,
  Shield,
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
    job: "L'Assurance Voyage vous accompagne en cas de maladie, d'accident ou d'imprévu pendant votre séjour à l'étranger. Vous bénéficierez d'une assistance et d'une prise en charge selon les garanties souscrites.",
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
    job: "Elle couvre les dommages causés à autrui, couvre votre véhicule : accident, vol, incendie, couvre les atteintes physiques du conducteur.",
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
    job: "L'Assurance Multirisque Habitation (MRH) protège votre habitation ainsi que son contenu contre différents dommages pouvant survenir à votre logement.",
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
    job: "L'Assurance Santé permet de prendre en charge, totalement ou partiellement selon les garanties souscrites, les frais liés à la maladie de l'assuré.",
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
    job: "La Prévoyance Individuelle permet de constituer une protection financière pour vos proches en cas de décès. Vous choisissez le niveau de capital à garantir ainsi que les bénéficiaires qui recevront les prestations prévues au contrat.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: Shield,
    href: quoteProductPathFromId("prevoyance"),
    imageSrc: "/images/hub/prevoyance.png",
    imageAlt: "Parent et enfant marchant ensemble",
  },
  {
    id: "accidents",
    navLabel: "Individuelle accidents",
    title: "Individuelle accidents",
    job: "L'Assurance Individuelle Accidents vous protège contre les conséquences des accidents corporels pouvant survenir dans le cadre de votre vie professionnelle ou privée.",
    durationLabel: "Environ 2 min",
    badge: "Devis instantané",
    status: "active",
    icon: Cross,
    href: quoteProductPathFromId("accidents"),
    imageSrc: "/images/hub/accidents.png",
    imageAlt: "Protection individuelle contre les accidents",
  },
  {
    id: "etudes",
    navLabel: "AFRIKIDS ETUDES",
    title: "AFRIKIDS ETUDES",
    job: "AFRIKIDS ÉTUDES est une solution d'assurance qui permet de préserver la scolarité de votre enfant en cas de décès ou d'Invalidité Absolue et Définitive (IAD) du parent ou tuteur assuré.",
    durationLabel: "Environ 1 min",
    badge: "Devis instantané",
    status: "active",
    icon: GraduationCap,
    href: quoteProductPathFromId("etudes"),
    imageSrc: "/images/hub/etudes.png",
    imageAlt: "Élèves en classe",
  },
  {
    id: "helep",
    navLabel: "AFRI HELEP",
    title: "AFRI HELEP",
    job: "AFRI HELEP est une solution d'assurance destinée aux membres de tontines, groupements d'épargne et de solidarité, associations et communautés disposant d'un mécanisme régulier de cotisation.",
    durationLabel: "Environ 1 min",
    badge: "Devis instantané",
    status: "active",
    icon: Users,
    href: quoteProductPathFromId("helep"),
    imageSrc: "/images/hub/helep.png",
    imageAlt: "Membres de tontine solidaires",
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
