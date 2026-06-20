// import { NextResponse, NextRequest } from "next/server";

// export async function proxy(request: NextRequest) {
//   const auth = request.cookies.get("token");
//   const pathname = request.nextUrl.pathname;

//   if (auth && pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const publicRoutes = ["/", "/flash-sales", "/best-selling"];

//   const isPublicRoute =
//     publicRoutes.includes(pathname) || pathname.startsWith("/product/");

//   if (!auth && !isPublicRoute && !pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };

import { NextResponse, NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const auth = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  // logged in user cannot open login
  if (auth && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // public pages
  const publicRoutes = ["/", "/login", "/flash-sales", "/best-selling"];

  // public route prefixes
  const publicPrefixes = ["/product/"];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicPrefixes.some((route) => pathname.startsWith(route));

  // protected pages
  if (!auth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
