"use client";

import { Mail, Phone } from "lucide-react";

import { HealthQuoteRecapCard } from "@/components/HealthQuote/layout/HealthQuoteRecapCard";
import { WhatsappIcon } from "@/icons";
import { HEALTH_QUOTE_FLOW_STEP } from "@/lib/constants/health-quote-flow";
import { QUOTE_PORTAL_HOW_IT_WORKS, QUOTE_PORTAL_SUPPORT } from "@/lib/constants/quote-portal";
import { useHealthQuoteFlowStep } from "@/hooks/use-health-quote-flow-step";

export function HealthQuotePortalAside() {
  const { flowStep, session } = useHealthQuoteFlowStep();
  const showRecap = flowStep >= HEALTH_QUOTE_FLOW_STEP.RECAP && session != null;

  return (
    <div className="space-y-4">
      {showRecap && session ? <HealthQuoteRecapCard quote={session.quote} /> : null}

      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
        <div className="bg-brand-primary px-4 py-[10px]">
          <h3 className="text-base font-bold text-white">Comment ça marche ?</h3>
        </div>
        <ol className="space-y-5 p-4 sm:p-5">
          {QUOTE_PORTAL_HOW_IT_WORKS.slice(0, 3).map((item) => (
            <li key={item.step} className="flex gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-sm font-bold text-white"
                aria-hidden
              >
                {item.step}
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
        <div className="bg-brand-primary px-4 py-3">
          <h3 className="text-base font-bold text-white">Besoin d&apos;aide ?</h3>
        </div>
        <div className="space-y-4 p-4 text-left text-sm text-gray-700 sm:p-5">
          <div className="space-y-2">
            <p className="font-bold">Nous joindre par :</p>
            <a
              href={`tel:${QUOTE_PORTAL_SUPPORT.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-brand-primary hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              {QUOTE_PORTAL_SUPPORT.phone}
            </a>
            <p className="text-xs text-gray-500">{QUOTE_PORTAL_SUPPORT.phoneHours}</p>
            <a
              href={`mailto:${QUOTE_PORTAL_SUPPORT.email}`}
              className="flex items-center gap-2 text-brand-primary hover:underline"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {QUOTE_PORTAL_SUPPORT.email}
            </a>
            <p className="text-xs text-gray-500">{QUOTE_PORTAL_SUPPORT.emailResponse}</p>
            <a
              href="https://wa.me/237681071414"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-primary hover:underline"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
