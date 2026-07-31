import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Solo protegemos la ruta /admin (pero no la página de login /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('admin_auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Si no tiene la cookie, lo mandamos al login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}