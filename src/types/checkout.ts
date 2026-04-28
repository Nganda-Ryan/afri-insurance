import type { PolicyType } from "@/lib/constants/constant";

export interface ICheckoutRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  planCategory: string;
  destination: string;
  externalPolicyId: string;
  policyType: PolicyType;
}
