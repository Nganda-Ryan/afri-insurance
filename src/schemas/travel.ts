import { z } from "zod";

export const travelQuoteWizardInputSchema = z.object({
  destination_area: z.string().min(1),
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  adult: z.number().int().positive().max(50),
  oldest_traveler_age: z.number().int().min(0).max(99),
  product_category: z.enum(["Standard", "Etudiant", "Pèlerinage"]),
  catalog_reference: z.string().min(1),
  catalog_version: z.number().int().positive(),
});

export const policyPersonSchema = z.object({
  title: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  birth_date: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  is_policy_beneficiary: z.number().int().min(0).max(1).optional(),
});

export const beneficiarySchema = z.object({
  title: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  passport_number: z.string().min(1),
  phone_number: z.string().min(1),
  birth_date: z.string().min(1),
  address: z.string().min(1),
  passeport_exp_date: z.string().min(1),
  city: z.string().min(1),
  destination_country: z.string().min(1),
  residence_country: z.string().min(1),
  nationality: z.string().min(1),
});

const duplicatePassportMessage =
  "Ce numéro de passeport est déjà utilisé pour un autre voyageur";

export const subscribePolicyInputSchema = z
  .object({
    subscription_country: z.string().min(1),
    language_code: z.string().min(2).max(5),
    agent_scope: z.string(),
    /** Optionnel : permet de souscrire sans dépendre du cookie EVO quote_code (utile si session expirée). */
    quote_code: z.string().min(1).optional(),
    policy_holder: z.array(policyPersonSchema).min(1),
    beneficiaries: z.array(beneficiarySchema).min(1),
    consents: z.array(z.string()),
    payment: z.object({
      type: z.string().min(1),
    }),
    addons: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    const byPassport = new Map<string, number[]>();
    data.beneficiaries.forEach((beneficiary, index) => {
      const key = beneficiary.passport_number.trim().toUpperCase();
      if (!key) return;
      const indices = byPassport.get(key) ?? [];
      indices.push(index);
      byPassport.set(key, indices);
    });
    for (const indices of byPassport.values()) {
      if (indices.length <= 1) continue;
      for (const index of indices) {
        ctx.addIssue({
          code: "custom",
          message: duplicatePassportMessage,
          path: ["beneficiaries", index, "passport_number"],
        });
      }
    }
  });

export const policiesByDateInputSchema = z.object({
  start_date: z.string().min(1),
  end_date: z.string().min(1),
});

export const cancelPolicyInputSchema = z.object({
  cancellation_reason: z.string().min(1),
});

export const updatePolicyInputSchema = z
  .record(z.string(), z.unknown())
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "Le payload de mise à jour ne peut pas être vide.",
  });
