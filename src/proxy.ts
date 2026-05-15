import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclut: api, _next/static, _next/image, favicon.ico et fichiers statiques
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)',
  ],
};
