"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";
import { actionFail, actionOk } from "@/lib/http/action-result";
import type { ActionResult } from "@/types/action-result";

// ─── Shared mailer ────────────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

// ─── Étape A : Envoi du lien de réinitialisation ──────────────────────────────

export async function sendPasswordResetLink(
  email: string,
): Promise<ActionResult<null>> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return actionFail("INVALID_INPUT", "L'adresse email est requise.");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: normalizedEmail,
        mode: "insensitive",
      },
    },
  });

  // Réponse identique qu'il existe ou non (évite l'énumération d'emails).
  if (!user?.email) {
    return actionOk(null);
  }

  // Génère un token aléatoire de 64 chars hex (256 bits d'entropie)
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

  // Supprime tout token existant pour cet email, puis sauvegarde le nouveau
  await prisma.passwordResetToken.deleteMany({ where: { email: user.email } });
  await prisma.passwordResetToken.create({
    data: { email: user.email, token, expires },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Réinitialisation de votre mot de passe – Afri Insurance",
      text: [
        "Bonjour,",
        "",
        "Vous avez demandé à définir ou réinitialiser votre mot de passe.",
        "Cliquez sur le lien ci-dessous pour continuer :",
        "",
        resetLink,
        "",
        "Ce lien est valable 1 heure.",
        "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.",
        "",
        "Cordialement,",
        "L'équipe Afri Insurance",
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#1a56db;margin-bottom:8px">Réinitialisation du mot de passe</h2>
          <p>Bonjour,</p>
          <p>
            Vous avez demandé à définir ou réinitialiser votre mot de passe
            sur <strong>Afri Insurance</strong>.
          </p>
          <p style="margin:32px 0">
            <a
              href="${resetLink}"
              style="
                display:inline-block;padding:12px 28px;
                background:#1a56db;color:#fff;border-radius:6px;
                text-decoration:none;font-weight:bold;font-size:15px
              "
            >
              Définir mon mot de passe
            </a>
          </p>
          <p>
            <small style="color:#6b7280">
              Ce lien est valable <strong>1 heure</strong>.
              Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
            </small>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#6b7280;font-size:13px">
            Cordialement,<br/>L'équipe Afri Insurance
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[password-reset] Email dispatch failed:", err);
    return actionFail("EMAIL_ERROR", "Impossible d'envoyer l'email. Réessayez plus tard.");
  }

  return actionOk(null);
}

// ─── Étape B : Création / réinitialisation du mot de passe ───────────────────

export async function resetUserPassword(
  token: string,
  newPassword: string,
): Promise<ActionResult<null>> {
  if (!token || !newPassword) {
    return actionFail("INVALID_INPUT", "Token ou mot de passe manquant.");
  }

  if (newPassword.length < 8) {
    return actionFail("WEAK_PASSWORD", "Le mot de passe doit contenir au moins 8 caractères.");
  }

  // Vérifie que le token existe et n'est pas expiré
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.expires < new Date()) {
    return actionFail(
      "TOKEN_INVALID",
      "Ce lien est invalide ou expiré. Veuillez faire une nouvelle demande.",
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    // Met à jour l'utilisateur : définit le hash et marque le compte comme actif
    prisma.user.update({
      where: { email: record.email },
      data: { passwordHash, isGuest: false },
    }),
    // Supprime le token utilisé (usage unique)
    prisma.passwordResetToken.delete({ where: { token } }),
  ]);

  return actionOk(null);
}
