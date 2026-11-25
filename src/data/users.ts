// Calls to the user API (ats_framework: ats_engine/server/user_api.py, routes under /users).
// The browser hits /framework/users/*, which the Vite dev server proxies to FRAMEWORK_URL.

export interface User {
  email: string
  name: string | null
  role: string | null
  created_at: string
  updated_at: string
}

async function userRequest(method: 'GET' | 'POST', path: string, body?: unknown): Promise<Response> {
  try {
    return await fetch(`/framework/users${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach the user API. Is the framework server running?')
  }
}

async function errorDetail(res: Response): Promise<string> {
  const text = await res.text()
  try {
    const body = JSON.parse(text) as { detail?: unknown }
    if (typeof body.detail === 'string') return body.detail
    if (Array.isArray(body.detail)) return 'Invalid input. Check the email address.'
  } catch {
    // non-JSON response; fall through
  }
  return text || `HTTP ${res.status}`
}

// Login: looks up an existing user with GET /users/{email}.
export async function loginUser(email: string): Promise<User> {
  const res = await userRequest('GET', `/${encodeURIComponent(email.trim().toLowerCase())}`)
  if (res.status === 404) {
    throw new Error('No account found for this email. Register first.')
  }
  if (!res.ok) {
    throw new Error(await errorDetail(res))
  }
  return (await res.json()) as User
}

// Register: creates the user with POST /users.
export async function registerUser(email: string, name?: string): Promise<User> {
  const trimmedName = name?.trim()
  const res = await userRequest('POST', '', {
    email,
    ...(trimmedName ? { name: trimmedName } : {}),
  })
  if (res.status === 409) {
    throw new Error('An account already exists for this email. Sign in instead.')
  }
  if (!res.ok) {
    throw new Error(await errorDetail(res))
  }
  return (await res.json()) as User
}
