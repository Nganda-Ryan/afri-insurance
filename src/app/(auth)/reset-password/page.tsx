import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Créer mon mot de passe – Afri Insurance",
  description: "Définissez votre mot de passe pour accéder à votre espace Afri Insurance",
};

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
