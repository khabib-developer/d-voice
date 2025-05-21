// lib/rateLimiter.ts

type Entry = { count: number; firstRequestTs: number };

const sessionMap = new Map<string, Entry>();
const ipMap = new Map<string, Entry>();

// You can tune these independently:
const SESSION_MAX_REQS = 5;
const IP_FALLBACK_MAX = 20;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function checkAndUpdate(
  map: Map<string, Entry>,
  key: string,
  maxReqs: number
): boolean {
  const now = Date.now();
  const entry = map.get(key);

  if (!entry || now - entry.firstRequestTs > WINDOW_MS) {
    // start new window
    map.set(key, { count: 1, firstRequestTs: now });
    return false;
  }

  if (entry.count >= maxReqs) {
    return true; // rate limited
  }

  entry.count++;
  return false;
}

export function isRateLimited(sessionId: string | null, ip: string): boolean {
  // 1) always enforce IP-only fallback
  if (checkAndUpdate(ipMap, ip, IP_FALLBACK_MAX)) {
    return true;
  }

  // 2) if sessionId exists, enforce session+ip layer
  if (sessionId) {
    const sessIpKey = `${sessionId}:${ip}`;
    if (checkAndUpdate(sessionMap, sessIpKey, SESSION_MAX_REQS)) {
      return true;
    }
  }

  return false;
}
