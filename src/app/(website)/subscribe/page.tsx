"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  QUOTE_PRODUCT_PATH,
  travelQuoteEntryHref,
} from "@/lib/constants/quote-product-routes";
import { migrateLegacySubscribeParams } from "@/lib/travel/quote-wizard-url";

function SubscribeRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sp = migrateLegacySubscribeParams(
      new URLSearchParams(searchParams.toString()),
    );
    sp.delete("p");
    const query = sp.toString();
    router.replace(
      query ? `${QUOTE_PRODUCT_PATH.travel}?${query}` : travelQuoteEntryHref(),
    );
  }, [router, searchParams]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-text-main">Redirection vers la cotation…</p>
    </main>
  );
}

/** Redirige vers le parcours voyage sur /voyage. */
export default function SubscribeRedirectPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-sm text-text-main">Redirection…</p>
        </main>
      }
    >
      <SubscribeRedirectContent />
    </Suspense>
  );
}
