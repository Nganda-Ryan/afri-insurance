export type Step = 1 | 2;
export type FlowPhase = "form" | "recap" | "payment";

export interface PersonFormData {
  title: "M" | "Mme";
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  passport_number: string;
  passeport_exp_date: string;
  destination_country: string;
  residence_country: string;
  nationality: string;
}

export interface SubscriberFormData extends PersonFormData {
  groupMembers: PersonFormData[];
}

export const HOLDER_FIELDS: Array<keyof Omit<SubscriberFormData, "groupMembers">> = [
  "title",
  "first_name",
  "last_name",
  "birth_date",
  "email",
  "phone_number",
  "address",
  "city",
  "passport_number",
  "passeport_exp_date",
  "residence_country",
  "nationality",
];
