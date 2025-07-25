import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/session";

const protectedRoutes = [
  "/change-photo",
  "/edit-profile",
  "/submit-work",
  "/sign-out",
  "/notifications",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  const session = await getSession();

  if (isProtectedRoute && !session?.id && !session?.token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (
    (req.nextUrl.pathname === "/sign-in" ||
      req.nextUrl.pathname === "/sign-up") &&
    session?.id &&
    session?.token
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
