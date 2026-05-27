import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { DAY_IN_MS, PLANS_TTL_MS } from "@/lib/constants/constant";
import { DESTINATION_AREA_OPTIONS } from "@/lib/travel/destination-area";
import type { SubscriberFormData } from "@/types/subscribe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function calculateAge(birthDateStr: string): number {
  const today = new Date();
  const birth = new Date(birthDateStr);
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

/** Nombre de jours entre deux dates ISO yyyy-mm-dd (inclusive du jour de départ). */
export function daysBetween(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.round((e - s) / DAY_IN_MS);
}

/** Ajoute n jours à une date ISO et retourne la date ISO résultante. */
export function addDaysToIso(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/** Retrouve le label lisible d'une destination à partir de sa valeur API. */
export function destinationLabel(value: string): string {
  return DESTINATION_AREA_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function generatePaymentTrid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `tr-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function ageFromBirthDate(value: string): number | null {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const monthDelta = today.getMonth() - d.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < d.getDate())) age -= 1;
  return age;
}

export function formatDateDisplay(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "-";
  return date.toLocaleDateString("fr-FR");
}

export function hasExpectedOldestAge(
  data: SubscriberFormData,
  expectedOldestAge: number,
): boolean {
  if (!Number.isFinite(expectedOldestAge)) return true;
  const ages = [
    ageFromBirthDate(data.birth_date),
    ...data.groupMembers.map((m) => ageFromBirthDate(m.birth_date)),
  ].filter((v): v is number => v != null);
  const currentOldestAge = ages.length ? Math.max(...ages) : null;
  return currentOldestAge != null && currentOldestAge === expectedOldestAge;
}


export function isCacheValid(fetchedAt: number | null): boolean {
  if (fetchedAt === null) return false;
  return Date.now() - fetchedAt < PLANS_TTL_MS;
}