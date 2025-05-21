import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent") || "";

  const allowedOrigin = process.env.ALLOWED_ORIGIN!;

  // Block requests with no origin or invalid origin
  const isValidOrigin =
    origin?.startsWith(allowedOrigin) || referer?.startsWith(allowedOrigin);
  const isBrowser = userAgent.includes("Mozilla");

  // if (!isValidOrigin || !isBrowser) {
  //   return new NextResponse(JSON.stringify({ error: "Access denied" }), {
  //     status: 403,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/(.*)", // Apply to all API routes
};
