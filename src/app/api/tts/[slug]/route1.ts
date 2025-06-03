import { NextRequest } from "next/server";
import { audioStreams, decryptBuffer, verifySession } from "../route2";

export async function GET(request: NextRequest) {
  const audioId = request.nextUrl.pathname.split("/").pop();
  const sessionToken = request.headers.get("x-session-token");
  const userAgent = request.headers.get("user-agent") || "";

  if (!audioId) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(audioStreams, audioId);

  const audioStream = audioStreams.get(audioId);
  if (!audioStream || audioStream.expires < Date.now()) {
    return new Response("Audio not found or expired", { status: 404 });
  }

  // Verify session (simple check - in production use proper JWT)
  //   if (!verifySession(sessionToken, audioId)) {
  //     return new Response("Invalid session", { status: 401 });
  //   }

  // Decrypt audio on-the-fly
  const decryptedAudio = decryptBuffer(audioStream.data, audioStream.key);

  // Handle Range Requests (partial content)
  const range = request.headers.get("range");
  const audioSize = decryptedAudio.length;

  if (range) {
    // Parse range header: "bytes=0-1023" or "bytes=1024-"
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : audioSize - 1;

    // Validate range
    if (start >= audioSize || end >= audioSize || start > end) {
      return new Response("Range Not Satisfiable", {
        status: 416,
        headers: {
          "Content-Range": `bytes */${audioSize}`,
        },
      });
    }

    const chunkSize = end - start + 1;
    const audioChunk = decryptedAudio.slice(start, end + 1);

    return new Response(audioChunk, {
      status: 206, // Partial Content
      headers: {
        "Content-Range": `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": audioStream.mimeType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        // Security headers
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    });
  } else {
    // Full audio request (fallback)
    return new Response(decryptedAudio, {
      status: 200,
      headers: {
        "Content-Length": audioSize.toString(),
        "Content-Type": audioStream.mimeType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    });
  }
}
