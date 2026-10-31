import "server-only";
import { createHash } from "node:crypto";

const state = globalThis as typeof globalThis & { arefRateLimit?: Map<string, { count: number; resetAt: number }> };
const buckets = state.arefRateLimit ?? (state.arefRateLimit = new Map());

function clientKey(request: Request, bucket: string) {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const hash = createHash("sha256").update(raw).digest("hex").slice(0, 20);
  return `${bucket}:${hash}`;
}

export function allowRequest(request: Request, bucket: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = clientKey(request, bucket);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    if (buckets.size > 2000) for (const [existingKey, item] of buckets) if (item.resetAt <= now) buckets.delete(existingKey);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}
