// Calls to the test framework API. The browser hits /framework/*, which the
// Vite dev server proxies to FRAMEWORK_URL (see vite.config.ts).
export type FrameworkAction = 'start' | 'stop'

export async function sendFrameworkCommand(action: FrameworkAction, test = 'dut_test'): Promise<unknown> {
  const res = await fetch(`/framework/${action}/${encodeURIComponent(test)}`, { method: 'POST' })
  const text = await res.text()
  let body: unknown = text
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    // non-JSON response; keep raw text
  }
  if (!res.ok) {
    const detail =
      body && typeof body === 'object' && 'detail' in body ? String((body as { detail: unknown }).detail) : text
    throw new Error(detail || `HTTP ${res.status}`)
  }
  return body
}
