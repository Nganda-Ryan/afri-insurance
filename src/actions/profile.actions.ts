"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { actionFail, actionOk } from "@/lib/http/action-result";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/types/action-result";
import type {
  IUpdatePasswordRequestDto,
  IUpdateProfileInfoRequestDto,
  IUserProfileDto,
} from "@/types/profile";

// ─── Profil courant ───────────────────────────────────────────────────────────

export async function getCurrentUserProfileAction(): Promise<ActionResult<IUserProfileDto>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return actionFail("UNAUTHORIZED", "Vous devez être connecté.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      isGuest: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return actionFail("USER_NOT_FOUND", "Utilisateur introuvable.");
  }

  return actionOk({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    isGuest: user.isGuest,
    hasPassword: !!user.passwordHash,
  });
}

// ─── Mise à jour des informations personnelles ────────────────────────────────

export async function updateProfileInfoAction(
  data: IUpdateProfileInfoRequestDto,
): Promise<ActionResult<null>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return actionFail("UNAUTHORIZED", "Vous devez être connecté.");
  }

  const { firstName, lastName, phone } = data;

  if (!firstName.trim() || !lastName.trim()) {
    return actionFail("VALIDATION_ERROR", "Le prénom et le nom sont requis.");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim() || null,
      name: `${firstName.trim()} ${lastName.trim()}`,
    },
  });

  return actionOk(null);
}

// ─── Changement de mot de passe ───────────────────────────────────────────────

export async function updatePasswordAction(
  data: IUpdatePasswordRequestDto,
): Promise<ActionResult<null>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return actionFail("UNAUTHORIZED", "Vous devez être connecté.");
  }

  const { currentPassword, newPassword, confirmPassword } = data;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return actionFail("VALIDATION_ERROR", "Tous les champs sont requis.");
  }

  if (newPassword.length < 8) {
    return actionFail(
      "WEAK_PASSWORD",
      "Le nouveau mot de passe doit contenir au moins 8 caractères.",
    );
  }

  if (newPassword !== confirmPassword) {
    return actionFail(
      "PASSWORD_MISMATCH",
      "Les mots de passe ne correspondent pas.",
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (!user?.passwordHash) {
    return actionFail(
      "NO_PASSWORD",
      "Ce compte n'a pas de mot de passe défini. Utilisez la connexion Google.",
    );
  }

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    return actionFail("WRONG_PASSWORD", "Mot de passe actuel incorrect.");
  }

  const newHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: newHash },
  });

  return actionOk(null);
}
