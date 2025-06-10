export function isMobile(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";
  return /mobile|android|iphone|ipad|ipod/i.test(userAgent);
}
