import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

// Configuramos next-intl
const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en'
});

// Exportamos por defecto (la forma más robusta)
export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|download|.*\\..*).*)']
};