import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getEmployees } from "./app/action/get-employee";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === "/no-access") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const email = token.email;
  const role = token.role;

  if (!email) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const employees = await getEmployees();

  const accessGranted = employees
    .filter((e) => e.status === "active")
    .map((e) => e.mail)
    .includes(email!);

  if (!accessGranted) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-role", role!);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!$|api|_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
