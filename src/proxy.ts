import { NextRequest, NextResponse } from "next/server";

import {
  LEGACY_PRODUCT_CODE_TO_PATH,
  QUOTE_PRODUCT_PATH,
} from "@/lib/constants/quote-product-routes";
import { URL_PARAM_PRODUCT } from "@/lib/constants/constant";

function redirectLegacyProductQuery(req: NextRequest): NextResponse | null {
  const path = req.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (path !== "/") return null;

  const productCode = req.nextUrl.searchParams.get(URL_PARAM_PRODUCT)?.trim().toLowerCase();
  if (!productCode) return null;

  const targetPath = LEGACY_PRODUCT_CODE_TO_PATH[productCode];
  if (!targetPath) return null;

  const url = req.nextUrl.clone();
  url.pathname = targetPath;
  url.searchParams.delete(URL_PARAM_PRODUCT);
  return NextResponse.redirect(url);
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/$/, "") || "/";

  if (path === "/subscribe") {
    const url = req.nextUrl.clone();
    url.pathname = QUOTE_PRODUCT_PATH.travel;
    url.searchParams.delete(URL_PARAM_PRODUCT);
    return NextResponse.redirect(url);
  }

  const legacyRedirect = redirectLegacyProductQuery(req);
  if (legacyRedirect) return legacyRedirect;

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)",
  ],
};
