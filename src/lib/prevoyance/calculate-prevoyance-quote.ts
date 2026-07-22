import {
  PREVOYANCE_CAPITAL_MULTIPLIERS,
  PREVOYANCE_INDIVIDUELLE_INSURANCE_DATA,
} from "@/lib/constants/prevoyance_individuelle_insurance";
import type {
  PrevoyanceQuoteFormInput,
  PrevoyanceQuoteResult,
} from "@/types/prevoyance-insurance";

const DATA = PREVOYANCE_INDIVIDUELLE_INSURANCE_DATA;

function roundMoney(value: number): number {
  return Math.round(value);
}

export function getPrevoyanceRate(
  age: number,
  durationYears: number,
): number | null {
  const byAge = DATA.rates[String(age)];
  if (!byAge) return null;
  const rate = byAge[String(durationYears)];
  return typeof rate === "number" && Number.isFinite(rate) ? rate : null;
}

export function getPrevoyanceAgeOptions(): { value: string; label: string }[] {
  return Object.keys(DATA.rates)
    .map((age) => Number.parseInt(age, 10))
    .filter((age) => Number.isFinite(age))
    .sort((a, b) => a - b)
    .map((age) => ({
      value: String(age),
      label: `${age} ans`,
    }));
}

export function getPrevoyanceDurationOptions(
  age: number,
): { value: string; label: string }[] {
  const byAge = DATA.rates[String(age)];
  if (!byAge) return [];
  return Object.keys(byAge)
    .map((duration) => Number.parseInt(duration, 10))
    .filter((duration) => Number.isFinite(duration))
    .sort((a, b) => a - b)
    .map((duration) => ({
      value: String(duration),
      label: duration === 1 ? "1 an" : `${duration} ans`,
    }));
}

export function getPrevoyanceCapitalOptions(): { value: string; label: string }[] {
  const { base_capital, currency } = DATA;
  return PREVOYANCE_CAPITAL_MULTIPLIERS.map((multiplier) => {
    const capital = base_capital * multiplier;
    return {
      value: String(capital),
      label: `${capital.toLocaleString("fr-FR")} ${currency}`,
    };
  });
}

export function calculatePrevoyanceQuote(
  input: PrevoyanceQuoteFormInput,
): PrevoyanceQuoteResult | null {
  const age = Math.floor(input.age);
  const durationYears = Math.floor(input.durationYears);
  const capital = Math.floor(input.capital);

  if (age < 0 || durationYears < 1 || capital < DATA.base_capital) return null;

  const rate = getPrevoyanceRate(age, durationYears);
  if (rate == null) return null;

  if (capital % DATA.base_capital !== 0) return null;

  const prime_risque = roundMoney(rate * (capital / DATA.base_capital));
  const frais_police = DATA.policy_fee;
  const prime_totale = prime_risque + frais_police;

  return {
    productName: DATA.product_name,
    devise: DATA.currency,
    breakdown: {
      age,
      durationYears,
      capital,
      rate,
      prime_risque,
      frais_police,
      prime_totale,
    },
  };
}
