import { useState, type FormEvent } from 'react'
import { loginUser, registerUser, type User } from '../data/users'

interface SignInPageProps {
  onSignIn: (user: User) => void
}

type Mode = 'login' | 'register'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

const modeLabel: Record<Mode, string> = {
  login: 'Sign in',
  register: 'Register',
}

export default function SignInPage({ onSignIn }: SignInPageProps) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmedEmail = email.trim()
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError('Enter a valid email address.')
      return
    }

    setPending(true)
    setError(null)
    try {
      const user =
        mode === 'login' ? await loginUser(trimmedEmail) : await registerUser(trimmedEmail, name)
      onSignIn(user)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="signin-page">
      <form className="signin-card" onSubmit={handleSubmit} noValidate>
        <div className="signin-tabs" role="tablist">
          {(Object.keys(modeLabel) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              className={`signin-tab${mode === key ? ' active' : ''}`}
              onClick={() => switchMode(key)}
            >
              {modeLabel[key]}
            </button>
          ))}
        </div>

        <p className="signin-hint">
          {mode === 'login'
            ? 'Enter the email of your account.'
            : 'New here? Enter your email to create an account.'}
        </p>

        <label className="signin-field">
          <span className="signin-label">Email</span>
          <input
            type="email"
            className="input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>

        {mode === 'register' && (
          <label className="signin-field">
            <span className="signin-label">Name (optional)</span>
            <input
              type="text"
              className="input"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary signin-submit" disabled={pending}>
          {pending ? 'Please wait…' : modeLabel[mode]}
        </button>
      </form>
    </div>
  )
}
