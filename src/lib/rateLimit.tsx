import { isRateLimited } from "@/lib/rateLimiter";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { sessionTime } from "./contstants";

export function checkRateLimit(request: Request) {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      path: "/",
      maxAge: sessionTime,
    });
  }

  // 2. --- Client IP ---
  const xff = request.headers.get("x-forwarded-for") || "";
  const clientIp = xff.split(",")[0].trim() || "unknown";
  // 3. --- Rate limiting per `${ip}:${sessionId}` ---
  return [sessionId, isRateLimited(sessionId, clientIp)];
}
