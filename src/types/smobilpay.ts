import type { z } from "zod";

import type {
  s3pCollectionInputSchema,
  s3pInitiatePaymentInputSchema,
  s3pVerifyInputSchema,
} from "@/schemas/smobilpay";

export interface S3pSubscriptionDto {
  payItemId: string;
  serviceNumber: string;
  serviceid: string | number;
  merchant: string;
  amountType: "FIXED" | "CUSTOM" | "PARTIAL" | "OVERPAY";
  name: string;
  localCur: string;
  amountLocalCur: number;
  customerReference?: string;
  customerName?: string;
  customerNumber?: string;
  startDate?: string;
  dueDate?: string;
  endDate?: string;
}

export interface S3pServiceDto {
  serviceid: number;
  merchant: string;
  title: string;
  description: string;
  type:
    | "SEARCHABLE_BILL"
    | "NON_SEARCHABLE_BILL"
    | "PRODUCT"
    | "TOPUP"
    | "SUBSCRIPTION"
    | "CASHIN"
    | "CASHOUT"
    | "VOUCHER";
  status: "Active" | "Inactive";
}

export interface S3pQuoteDto {
  quoteId: string;
  expiresAt: string;
  payItemId: string;
  amountLocalCur: number;
  priceLocalCur: number;
  priceSystemCur: number;
  localCur: string;
  systemCur: string;
  promotion?: string;
}

export type S3pCollectionStatus =
  | "REVERSED"
  | "PENDING"
  | "ERRORED"
  | "UNDERINVESTIGATION"
  | "SUCCESS";

export interface S3pCollectionResponseDto {
  ptn: string;
  timestamp: string;
  agentBalance: number;
  receiptNumber: string;
  veriCode: string;
  priceLocalCur: number;
  priceSystemCur: number;
  localCur: string;
  systemCur: string;
  trid?: string;
  pin?: string;
  status: S3pCollectionStatus;
  payItemId?: string;
  payItemDescr?: string;
  tag?: string;
}

export type S3pPaymentStatusEnum =
  | "REVERSED"
  | "DEBITED"
  | "PENDING"
  | "INPROCESS"
  | "ERRORED"
  | "UNDERINVESTIGATION"
  | "ERROREDREFUNDED"
  | "SUCCESS";

export interface S3pPaymentStatusDto {
  ptn: string;
  serviceid: string;
  merchant: string;
  timestamp: string;
  receiptNumber: string;
  veriCode: string;
  clearingDate: string;
  trid?: string;
  priceLocalCur: number;
  priceSystemCur: number;
  localCur: string;
  systemCur: string;
  pin?: string;
  status: S3pPaymentStatusEnum;
  payItemId?: string;
  payItemDescr?: string;
  errorCode: number;
  tag?: string;
}

export type S3pInitiatePaymentInput = z.infer<typeof s3pInitiatePaymentInputSchema>;
export type S3pVerifyInput = z.infer<typeof s3pVerifyInputSchema>;
export type S3pCollectionInput = z.infer<typeof s3pCollectionInputSchema>;
