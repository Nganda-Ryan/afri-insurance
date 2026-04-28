import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Permet de lier un compte Google à un utilisateur déjà existant (même email).
      // Sûr avec Google car l'email est toujours vérifié côté Google.
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ou mot de passe incorrect");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Email ou mot de passe incorrect");
        }

        // Compte fantôme : créé lors d'un achat, sans mot de passe défini
        if (!user.passwordHash || user.isGuest) {
          throw new Error("COMPTE_FANTOME");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isValid) {
          throw new Error("Email ou mot de passe incorrect");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Quand un compte fantôme se connecte via Google pour la première fois,
      // on le marque comme actif (isGuest: false).
      if (account?.provider === "google" && user?.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, isGuest: true },
        });
        if (existing?.isGuest) {
          await prisma.user.update({
            where: { id: existing.id },
            data: { isGuest: false },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Premier passage : user est défini (connexion initiale)
      if (user) {
        token.id = user.id;
        token.isGuest = (user as { isGuest?: boolean }).isGuest ?? true;
      }

      // Pour Google : à la connexion, on récupère isGuest depuis la DB
      // car authorize() n'est pas appelé pour les providers OAuth
      if (account?.provider === "google" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { isGuest: true },
        });
        if (dbUser) token.isGuest = dbUser.isGuest;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isGuest = token.isGuest as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};
