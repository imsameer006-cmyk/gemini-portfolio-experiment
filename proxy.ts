import { NextResponse, type NextRequest } from "next/server";
import { isValidSiteAuthCookie, SITE_AUTH_COOKIE } from "@/lib/site-auth";

const PUBLIC_PATHS = new Set(["/enter", "/api/verify-password"]);

function isProtectedPath(pathname: string) {
  return pathname === "/work" || pathname.startsWith("/work/");
}

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(?:avif|css|gif|ico|jpg|jpeg|js|json|map|mp4|png|svg|txt|webmanifest|webp|woff|woff2)$/i)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SITE_AUTH_COOKIE)?.value;
  const authenticated = await isValidSiteAuthCookie(cookie);

  if (authenticated) {
    const response = NextResponse.next();
    response.cookies.delete(SITE_AUTH_COOKIE);
    return response;
  }

  const enterUrl = request.nextUrl.clone();
  enterUrl.pathname = "/enter";
  enterUrl.search = "";
  enterUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(enterUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
