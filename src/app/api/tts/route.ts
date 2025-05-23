import { isRateLimited } from "@/lib/rateLimiter";
import axios from "axios";
import https from "https";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const development = process.env.NODE_ENV === "development";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1) extract params
  const { searchParams } = request.nextUrl;
  const model = searchParams.get("model")!;
  const text = searchParams.get("text")!;
  const recaptchaToken = searchParams.get("recaptchaToken")!;

  // 2) rate-limit & captcha (reuse your helpers)
  if (checkRateLimit(request)) {
    return new Response(
      JSON.stringify({ error: "Too many requests; please slow down." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }
  const recaptchaData = await checkCaptcha(recaptchaToken);
  if (
    (!recaptchaData.success || recaptchaData.score < 0.5) &&
    process.env.NODE_ENV !== "development"
  ) {
    return new Response(JSON.stringify({ error: "reCAPTCHA failed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3) proxy the TTS API in streaming mode
  const ttsRes = await fetch(process.env.TTS_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: process.env.TTS_TOKEN!,
    },
    body: JSON.stringify({ model, text, format: "MP3" }),
  });

  if (!ttsRes.ok) {
    console.error("TTS API error:", await ttsRes.text());
    return new Response(JSON.stringify({ error: "TTS API failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 4) pipe it straight through as audio/mpeg
  return new Response(ttsRes.body, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
function checkRateLimit(request: Request) {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  // 2. --- Client IP ---
  const xff = request.headers.get("x-forwarded-for") || "";
  const clientIp = xff.split(",")[0].trim() || "unknown";
  // 3. --- Rate limiting per `${ip}:${sessionId}` ---
  return isRateLimited(sessionId, clientIp);
}

async function checkCaptcha(recaptchaToken: string) {
  // 1. Verify reCAPTCHA
  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: recaptchaToken,
      }),
    }
  );

  const recaptchaData = await recaptchaRes.json();
  return recaptchaData;
}
