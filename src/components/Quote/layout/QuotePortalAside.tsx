"use client";

import { EnvelopeIcon, WhatsappIcon, TelephoneIcone } from "@/icons"; 

import {
  QUOTE_PORTAL_HOW_IT_WORKS,
  QUOTE_PORTAL_SUPPORT,
} from "@/lib/constants/quote-portal";

export function QuotePortalAside() {
  return (
    <div className="space-y-4">
      {/* Section Comment ça marche */}
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

      {/* Section Besoin d'aide */}
      <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white ">
        <div className="bg-brand-primary px-4 py-3">
          <h3 className="text-base font-bold text-white">Besoin d&apos;aide ?</h3>
        </div>
        <div className="space-y-4 p-4 text-left text-sm text-gray-700 sm:p-5">
          
          {/* Bloc Téléphone & WhatsApp */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TelephoneIcone className="h-6 w-6 shrink-0"/>
              <p className="font-bold">{QUOTE_PORTAL_SUPPORT.phone}</p>
            </div>
            <div className="flex items-center gap-2 pl-[24px]">
              <WhatsappIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
              <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.phoneHours}</p>
            </div>
          </div>

          {/* Bloc Email */}
          <div className="flex items-start gap-2 pt-1">
            <EnvelopeIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">{QUOTE_PORTAL_SUPPORT.email}</p>
              <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.emailResponse}</p>
            </div>
          </div>

          {/* Bloc Nos Agences dynamique */}
          <div className="pt-1">
            <p className="font-semibold">{QUOTE_PORTAL_SUPPORT.agenciesLabel}</p>
            <ul className="mt-1 space-y-1.5 pl-1 text-gray-600">
              {QUOTE_PORTAL_SUPPORT.agencies.map((agency, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-brand-secondary font-bold">•</span>
                  <span>
                    <strong>{agency.city} :</strong> {agency.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="pt-1 text-center text-xs font-semibold">
            {QUOTE_PORTAL_SUPPORT.footer}
          </p>
        </div>
      </div>
    </div>
  );
}



