import { z } from "zod";

export const s3pInitiatePaymentInputSchema = z.object({
  policyId: z.string().min(1),
  amount: z.number().positive(),
  customerPhonenumber: z
    .string()
    .min(8, "Numero de telephone trop court")
    .max(15, "Numero de telephone trop long")
    .regex(/^[0-9]+$/, "Numero de telephone invalide (chiffres uniquement)"),
  customerEmailaddress: z.string().email(),
  customerName: z.string().min(1),
  customerAddress: z.string().optional(),
  trid: z.string().optional(),
});

export const s3pCollectionInputSchema = z.object({
  quoteId: z.string().min(1),
  customerPhonenumber: z.string().min(8).max(15),
  customerEmailaddress: z.string().email(),
  customerName: z.string().optional(),
  customerAddress: z.string().optional(),
  customerNumber: z.string().optional(),
  serviceNumber: z.string().optional(),
  trid: z.string().optional(),
  tag: z.string().max(50).optional(),
  cdata: z.string().optional(),
});

export const s3pVerifyInputSchema = z.object({
  ptn: z.string().min(1).optional(),
  trid: z.string().min(1).optional(),
});
