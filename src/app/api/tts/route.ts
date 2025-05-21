import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, text, recaptchaToken } = body;

    const recaptchaData = await checkCaptcha(recaptchaToken);

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return new Response(JSON.stringify({ error: "reCAPTCHA failed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const format = "MP3";

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

    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": response.data.byteLength.toString(),
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
