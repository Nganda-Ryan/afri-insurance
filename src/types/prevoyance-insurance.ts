export interface PrevoyanceInsuranceData {
  product_code: string;
  product_name: string;
  base_capital: number;
  policy_fee: number;
  currency: string;
  /** age (years) → duration (years) → annual rate for base_capital */
  rates: Record<string, Record<string, number>>;
}

export interface PrevoyanceQuoteFormInput {
  age: number;
  durationYears: number;
  capital: number;
}

export interface PrevoyanceQuoteBreakdown {
  age: number;
  durationYears: number;
  capital: number;
  rate: number;
  prime_risque: number;
  frais_police: number;
  prime_totale: number;
}

export interface PrevoyanceQuoteResult {
  productName: string;
  devise: string;
  breakdown: PrevoyanceQuoteBreakdown;
}

export interface PrevoyanceQuoteSession {
  form: PrevoyanceQuoteFormInput;
  quote: PrevoyanceQuoteResult;
}
