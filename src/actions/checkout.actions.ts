"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";
import { actionFail, actionOk } from "@/lib/http/action-result";
import { fetchPolicyContractEmailAttachments } from "@/lib/travel/fetch-policy-contract-for-email";
import type { ICheckoutRequestDto } from "@/types/checkout";
import type { ActionResult } from "@/types/action-result";

export async function processInsuranceCheckout(
  input: ICheckoutRequestDto,
): Promise<ActionResult<{ policyId: string }>> {
  const {
    email,
    firstName,
    lastName,
    phone,
    planCategory,
    destination,
    externalPolicyId,
    policyType,
  } = input;

  // Generate the raw token before the transaction so it's available for the email step
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(`${rawToken}${process.env.NEXTAUTH_SECRET ?? ""}`)
    .digest("hex");

  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 h

  let policyId: string;

  try {
    // With Supabase pooler, interactive transactions can timeout unexpectedly.
    // Keep DB operations short and explicit to improve reliability.
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        phone,
      },
      create: {
        email,
        firstName,
        lastName,
        phone,
        isGuest: true,
      },
    });

    const policy = await prisma.policy.create({
      data: {
        userId: user.id,
        externalPolicyId,
        policyType,
        planCategory,
        destination,
      },
    });

    // NextAuth stores hashed email tokens; keep only latest token per identifier.
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });
    await prisma.verificationToken.create({
      data: { identifier: email, token: hashedToken, expires: tokenExpires },
    });

    policyId = policy.id;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de l'enregistrement.";
    return actionFail("CHECKOUT_DB_ERROR", message);
  }

  // ── Step 5 – Build the Magic Link ──────────────────────────────────────────
  // NextAuth callback expects the RAW token in the URL; the DB holds the hash.
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const callbackUrl = encodeURIComponent(`${baseUrl}/dashboard`);
  const magicLink =
    `${baseUrl}/api/auth/callback/email` +
    `?callbackUrl=${callbackUrl}` +
    `&token=${rawToken}` +
    `&email=${encodeURIComponent(email)}`;

  // ── Step 6 – Send the confirmation email via nodemailer ────────────────────
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const contractAttachments = await fetchPolicyContractEmailAttachments(
      externalPolicyId,
      email,
    );
    const hasContractAttachment = contractAttachments.length > 0;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Votre contrat Afri Insurance",
      text: [
        `Bonjour ${firstName},`,
        "",
        "Merci pour votre confiance ! Votre assurance voyage est confirmée.",
        hasContractAttachment
          ? "Votre contrat est joint à cet email (même document que sur la page de confirmation)."
          : "Votre contrat est disponible dans votre espace client (lien ci-dessous).",
        "",
        "Accédez à votre espace client :",
        magicLink,
        "",
        "Ce lien est valable 24 heures.",
        "",
        "Cordialement,",
        "L'équipe Afri Insurance",
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto">
          <p>Bonjour <strong>${firstName}</strong>,</p>
          <p>
            Merci pour votre confiance&nbsp;! Votre assurance voyage est confirmée.
          </p>
          ${
            hasContractAttachment
              ? `<p>
            <strong>Votre contrat est joint à cet email</strong> (le même document
            que vous pouvez télécharger après paiement).
          </p>`
              : `<p>
            Votre contrat est disponible dans votre espace client via le lien ci-dessous.
          </p>`
          }
          <p style="margin:32px 0">
            <a
              href="${magicLink}"
              style="
                display:inline-block;padding:12px 28px;
                background:#1a56db;color:#fff;border-radius:6px;
                text-decoration:none;font-weight:bold;font-size:15px
              "
            >
              Accéder à mon espace client
            </a>
          </p>
          <p>
            <small style="color:#6b7280">
              Lien valable 24&nbsp;heures. Si vous n'avez pas fait cette
              demande, ignorez simplement cet email.
            </small>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#6b7280;font-size:13px">
            Cordialement,<br/>L'équipe Afri Insurance
          </p>
        </div>
      `,
      attachments: contractAttachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
  } catch (err) {
    // Email failure is non-fatal — the policy is committed, log and continue.
    console.error("[checkout] Email dispatch failed:", err);
  }

  return actionOk({ policyId });
}
