import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { isValidAdminCookie } from '@/lib/adminAuth';

const locales = ["en", "ru", "uk", "fr"];

// Configuramos next-intl
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Separamos el prefijo de idioma (si lo hay) para saber la ruta real
  const [, first, ...rest] = pathname.split("/");
  const hasLocale = locales.includes(first);
  const path = "/" + (hasLocale ? rest : [first, ...rest]).join("/");

  // Protegemos /admin (excepto /admin/login) con la cookie de sesión
  if (
    (path === "/admin" || path.startsWith("/admin/")) &&
    !path.startsWith("/admin/login")
  ) {
    if (!isValidAdminCookie(request.cookies.get("admin_auth")?.value)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${hasLocale ? first : "en"}/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // /admin y /download ahora también pasan por aquí (idioma + protección)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
