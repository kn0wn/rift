import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { z } from 'zod'
import { authClient } from '@/lib/auth/auth-client'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/auth/sign-up')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: SignUpPage,
})

function getRedirectTarget(value: string | undefined): string {
  if (!value) return '/chat'
  return value.startsWith('/') ? value : '/chat'
}

function SignUpPage() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const redirectTarget = getRedirectTarget(search.redirect)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onEmailSignUp = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await authClient.signUp.email({
        name,
        email,
        password,
      })
      void navigate({ to: redirectTarget })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : m.auth_sign_up_error_default())
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold text-content-emphasis">{m.auth_sign_up_title()}</h1>
      <p className="mt-2 text-sm text-content-muted">{m.auth_sign_up_subtitle()}</p>

      <form className="mt-6 space-y-3" onSubmit={onEmailSignUp}>
        <input
          className="w-full rounded-md border border-border-default bg-bg-subtle px-3 py-2"
          type="text"
          placeholder={m.auth_sign_up_name_placeholder()}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-border-default bg-bg-subtle px-3 py-2"
          type="email"
          placeholder={m.auth_sign_up_email_placeholder()}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-border-default bg-bg-subtle px-3 py-2"
          type="password"
          placeholder={m.auth_sign_up_password_placeholder()}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          className="w-full rounded-md bg-bg-inverted px-3 py-2 text-content-inverted disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? m.auth_sign_up_submitting() : m.auth_sign_up_submit()}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-content-error">{error}</p> : null}
    </main>
  )
}
