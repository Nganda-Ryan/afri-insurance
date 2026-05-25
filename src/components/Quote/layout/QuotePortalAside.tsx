"use client";

import {
  QUOTE_PORTAL_HOW_IT_WORKS,
  QUOTE_PORTAL_SUPPORT,
} from "@/lib/constants/quote-portal";

export function QuotePortalAside() {
  return (
    <div className="space-y-4">
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
        <div className="space-y-4 p-4 text-center text-sm text-gray-700 sm:p-5">
          <div>
            <p className="font-bold">{QUOTE_PORTAL_SUPPORT.phone}</p>
            <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.phoneHours}</p>
          </div>
          <div>
            <p className="font-bold">{QUOTE_PORTAL_SUPPORT.email}</p>
            <p className="text-gray-600">{QUOTE_PORTAL_SUPPORT.emailResponse}</p>
          </div>
          <div>
            <p className="font-semibold">{QUOTE_PORTAL_SUPPORT.agenciesLabel}</p>
            <p>{QUOTE_PORTAL_SUPPORT.agencies}</p>
          </div>
          <p className="pt-1 text-xs font-semibold text-brand-secondary">{QUOTE_PORTAL_SUPPORT.footer}</p>
        </div>
      </div>
    </div>
  );
}
