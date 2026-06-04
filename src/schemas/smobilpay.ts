import { z } from "zod";

import {
  isValidCameroonPhone,
  normalizeCameroonPhone,
} from "@/lib/smobilpay/phone";

const cameroonPhoneField = (invalidMessage: string) =>
  z
    .string()
    .min(8, invalidMessage)
    .transform(normalizeCameroonPhone)
    .refine(isValidCameroonPhone, { message: invalidMessage });

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

/** Collecte cash-out (OM / MoMo) avant création de police. */
export const s3pCashoutCollectInputSchema = z.object({
  amount: z.number().positive(),
  channel: z.enum(["om", "momo"]),
  paymentPhone: cameroonPhoneField("Numéro de paiement invalide."),
  subscriberPhone: cameroonPhoneField("Téléphone souscripteur invalide."),
  customerEmailaddress: z.string().email(),
  customerName: z.string().min(1),
  customerAddress: z.string().optional(),
  trid: z.string().min(1),
});
