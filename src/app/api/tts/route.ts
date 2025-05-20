import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, text } = body;

    const format = "WAV";

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
