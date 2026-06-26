const windowMs = 60_000
const maxRequests = 10

const hits = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string): { ok: boolean } {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }

  entry.count++
  if (entry.count > maxRequests) {
    return { ok: false }
  }

  return { ok: true }
}
