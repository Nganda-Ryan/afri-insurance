import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mot de passe oublié – Afri Insurance",
  description: "Réinitialisez ou créez votre mot de passe Afri Insurance",
};

export default function ForgotPassword() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
