import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const WINDOW = '1 h';
const MAX_REQUESTS = 3;

let limiter: Ratelimit | null = null;

function getRedisLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  if (!limiter) {
    const redis = new Redis({ url, token });
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
      analytics: true,
      prefix: 'ratelimit:contact-form',
    });
  }
  return limiter;
}

type Bucket = { count: number; resetAt: number };
const memoryStore = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000;

function memoryRateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const existing = memoryStore.get(identifier);

  if (!existing || now > existing.resetAt) {
    memoryStore.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  return { success: true, remaining: MAX_REQUESTS - existing.count };
}

export async function checkRateLimit(
  identifier: string
): Promise<{ success: boolean; remaining: number; usingRedis: boolean }> {
  const redisLimiter = getRedisLimiter();

  if (redisLimiter) {
    const result = await redisLimiter.limit(identifier);
    return { success: result.success, remaining: result.remaining, usingRedis: true };
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      JSON.stringify({
        event: 'rate_limit_fallback_in_production',
        message:
          'UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set. Falling back to in-memory rate limiting, which does NOT work correctly across multiple serverless instances. Set up Upstash Redis before relying on this in production.',
      })
    );
  }

  const result = memoryRateLimit(identifier);
  return { ...result, usingRedis: false };
}
