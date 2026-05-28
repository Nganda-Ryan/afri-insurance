"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";

import { QuotePlanRecapCard } from "@/components/Quote/layout/QuotePlanRecapCard";
import { WhatsappIcon } from "@/icons";
import { TRAVEL_QUOTE_FLOW_STEP } from "@/lib/constants/quote-flow";
import { useTravelQuoteFlowStep } from "@/hooks/use-travel-quote-flow-step";
import {
  QUOTE_PORTAL_HOW_IT_WORKS,
  QUOTE_PORTAL_SUPPORT,
} from "@/lib/constants/quote-portal";
import {
  parseSelectedPlanFromSearchParams,
  parseTripDetailsFromSearchParams,
} from "@/lib/travel/quote-wizard-url";

export function QuotePortalAside() {
  const searchParams = useSearchParams();
  const { flowStep } = useTravelQuoteFlowStep();

  const showPlanRecap = useMemo(() => {
    const trip = parseTripDetailsFromSearchParams(searchParams);
    const selection = parseSelectedPlanFromSearchParams(searchParams);
    return (
      flowStep >= TRAVEL_QUOTE_FLOW_STEP.DETAILS && selection != null && trip != null
    );
  }, [searchParams, flowStep]);

  const planRecapProps = useMemo(() => {
    if (!showPlanRecap) return null;
    const trip = parseTripDetailsFromSearchParams(searchParams);
    const selection = parseSelectedPlanFromSearchParams(searchParams);
    if (!trip || !selection) return null;
    const currencyLabel = selection.quoteContext.currency?.trim();
    return {
      planName: selection.plan.name,
      totalPremiumLabel: `${selection.plan.price.toLocaleString("fr-FR")}${currencyLabel ? ` ${currencyLabel}` : ""}`,
      destination: trip.destination_area,
      startDate: trip.start_date,
      endDate: trip.end_date,
      adult: String(trip.adult),
    };
  }, [searchParams, showPlanRecap]);

  return (
    <div className="space-y-4 hidden sm:block">
      {planRecapProps && <QuotePlanRecapCard {...planRecapProps} />}

      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
        <div className="bg-brand-primary px-4 py-[10px]">
          <h3 className="text-base font-bold text-white">Comment ça marche ?</h3>
        </div>
        <ol className="space-y-5 p-4 sm:p-5">
          {QUOTE_PORTAL_HOW_IT_WORKS.map((item) => (
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

      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white ">
        <div className="bg-brand-primary px-4 py-3">
          <h3 className="text-base font-bold text-white">Besoin d&apos;aide ?</h3>
        </div>
        <div className="space-y-4 p-4 text-left text-sm text-gray-700 sm:p-5">
          <div className="space-y-2">
            <p className="font-bold">Nous joindre par :</p>
            <div className="flex items-center gap-2 pl-1">
              <Phone className="h-4 w-4 shrink-0" />
              <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.phone}</p>
            </div>

            <div className="flex items-center gap-2 pl-1">
              <WhatsappIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
              <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.phoneHours}</p>
            </div>

            <div className="flex items-start gap-2 pl-1">
              <Mail className="mt-0.5 ml-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>{QUOTE_PORTAL_SUPPORT.email}</p>
                <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.emailResponse}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">{QUOTE_PORTAL_SUPPORT.agenciesLabel}</p>
            <ul className="mt-1 space-y-1.5 pl-1 text-gray-600">
              {QUOTE_PORTAL_SUPPORT.agencies.map((agency, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>{agency.city} :</strong> {agency.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
