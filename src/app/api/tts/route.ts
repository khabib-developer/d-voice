import axios from "axios";
import https from "https";
import { cookies } from "next/headers";
import { audioMap } from "@/lib/audioMap";
import { randomBytes } from "crypto";
import { maskStore, xorBuffer } from "@/lib/mask";
import { checkCaptcha } from "@/lib/captcha";
import { checkRateLimit } from "@/lib/rateLimit";
import { getWavDuration } from "@/lib/duration";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const development = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  try {
    const [sessionId, limit] = checkRateLimit(request);

    if (limit)
      return new Response(
        JSON.stringify({ error: "Too many requests; please slow down." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );

    const body = await request.json();
    const { model, text, recaptchaToken } = body;

    const recaptchaData = await checkCaptcha(recaptchaToken);

    if ((!recaptchaData.success || recaptchaData.score < 0.5) && !development) {
      return new Response(JSON.stringify({ error: "reCAPTCHA failed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const format = "wav";

    const response = await axios.post(
      process.env.TTS_API!,
      { text, model, format },
      {
        responseType: "arraybuffer",
        headers: {
          token: process.env.TTS_TOKEN!,
        },
        httpsAgent,
      }
    );

    const newMask = randomBytes(16);
    maskStore[String(sessionId)] = { mask: newMask };

    const audioBuffer = Buffer.from(response.data);

    const data = await audioMap.set(
      String(sessionId),
      audioBuffer,
      getWavDuration(audioBuffer)
    );

    return new Response(
      JSON.stringify({
        amount: data.amount,
        duration: data.duration,
        mask: newMask.toString("base64"),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("TTS request failed:", error.message);
    return new Response(JSON.stringify({ error: "TTS API failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();

    let sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // console.log(sessionId, maskStore[sessionId]);

    const info = maskStore[sessionId];
    if (!info) {
      // (Maybe the session expired or someone tried to call GET before POST.)
      return new Response(JSON.stringify({ error: "bad request" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = audioMap.get(sessionId) as Buffer;

    if (!data) {
      return new Response(JSON.stringify({ error: "wrong" }), {
        status: 404,
        headers: {
          "Content-Length": "application/json",
        },
      });
    }

    const { mask } = info;

    // 3) XOR the chunk with that mask to “scramble” it:
    const scrambled = xorBuffer(data, mask);

    return new Response(scrambled, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": scrambled.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error("TTS request failed:", error.message);
    return new Response(JSON.stringify({ error: "TTS API failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
