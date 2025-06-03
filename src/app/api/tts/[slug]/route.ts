import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { audioMap } from "../../../../lib/audioMap";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").pop();
  const cookieStore = cookies();
  let sessionId = cookieStore.get("sessionId")?.value;

  if (!slug || !sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(sessionId, slug);
  const data = audioMap.get(sessionId);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
