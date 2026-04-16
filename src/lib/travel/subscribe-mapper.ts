import type { SubscribePolicyInput } from "@/types/travel";

export type BuildSubscribeInputParams = {
  subscriptionCountry: string;
  languageCode: string;
  travelerFullName: string;
  travelerEmail: string;
  travelerBirthDate: string;
  travelerPhone: string;
  address: string;
  city: string;
  passportNumber: string;
  passportExpiry: string;
};

function splitName(full: string): { first_name: string; last_name: string } {
  const t = full.trim();
  if (!t) return { first_name: "Traveler", last_name: "Unknown" };
  const parts = t.split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0]!, last_name: parts[0]! };
  return {
    first_name: parts[0]!,
    last_name: parts.slice(1).join(" "),
  };
}

/**
 * Construit le corps métier pour `travel/policies` (hors `quote_code`, injecté en Server Action via cookie HTTP-only).
 */
export function buildSubscribePolicyInput(
  p: BuildSubscribeInputParams,
): SubscribePolicyInput {
  const { first_name, last_name } = splitName(p.travelerFullName);

  return {
    subscription_country: p.subscriptionCountry,
    language_code: p.languageCode,
    agent_scope: "",
    policy_holder: [
      {
        title: "M",
        first_name,
        last_name,
        birth_date: p.travelerBirthDate,
        email: p.travelerEmail,
        address: p.address,
        is_policy_beneficiary: 0,
      },
    ],
    beneficiaries: [
      {
        title: "M",
        first_name,
        last_name,
        email: p.travelerEmail,
        passport_number: p.passportNumber,
        phone_number: p.travelerPhone,
        birth_date: p.travelerBirthDate,
        address: p.address,
        passeport_exp_date: p.passportExpiry,
        city: p.city,
      },
    ],
    consents: [],
    payment: { type: "MANAGED_BY_PARTNER" },
    addons: [],
  };
}
