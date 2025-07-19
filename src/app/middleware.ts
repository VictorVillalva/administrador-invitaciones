import { NextRequest, NextResponse } from "next/server";

// Ajusta según tus rutas privadas
const PROTECTED_PATHS = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // ¿Es una ruta protegida?
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // Busca el token en cookies
  const token = request.cookies.get("token");

  if (isProtected && !token) {
    // No autenticado, redirige a login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Indica a Next.js qué rutas aplicar el middleware
export const config = {
  matcher: ["/dashboard/:path*"], // ajusta según tus rutas privadas
};
