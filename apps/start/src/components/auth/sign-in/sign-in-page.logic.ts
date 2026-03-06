'use client'

import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { authClient } from '@/lib/auth/auth-client'

/** Redirect target derived from search.redirect; defaults to /chat. */
export function getRedirectTarget(redirect: string | undefined): string {
  if (!redirect) return '/chat'
  return redirect.startsWith('/') ? redirect : '/chat'
}

export type SignInPageLogicResult = {
  isSignUp: boolean
  showForgotPassword: boolean
  isLoading: boolean
  error: string
  handleToggleMode: () => void
  handleShowForgotPassword: () => void
  handleBackToLogin: () => void
  /** Single submit handler: sign-in or sign-up based on current isSignUp. */
  handleAuthSubmit: (email: string, password: string) => Promise<void>
}

/**
 * Logic for the sign-in/sign-up page: toggle mode, forgot password flow,
 * and auth submit (sign-in or sign-up) with redirect.
 */
export function useSignInPageLogic(
  redirectTarget: string,
  initialMode: 'sign-in' | 'sign-up' = 'sign-in',
): SignInPageLogicResult {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(initialMode === 'sign-up')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleMode = useCallback(() => {
    setIsSignUp((prev) => !prev)
    setError('')
  }, [])

  const handleShowForgotPassword = useCallback(() => {
    setShowForgotPassword(true)
  }, [])

  const handleBackToLogin = useCallback(() => {
    setShowForgotPassword(false)
    setError('')
  }, [])

  const handleSignInSubmit = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError('')

      const { data, error } = await authClient.signIn.email({ email, password })
      setIsLoading(false)

      if (error) {
        setError(error.message ?? 'An unexpected error occurred. Please try again.')
        return
      }

      void navigate({ to: redirectTarget })
    },
    [redirectTarget, navigate],
  )

  const handleSignUpSubmit = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError('')

      const { data, error } = await authClient.signUp.email({ name: '', email, password })
      setIsLoading(false)

      if (error) {
        setError(error.message ?? 'An unexpected error occurred. Please try again.')
        return
      }

      void navigate({ to: '/chat' })
    },
    [navigate],
  )

  const handleAuthSubmit = useCallback(
    async (email: string, password: string) => {
      if (isSignUp) {
        await handleSignUpSubmit(email, password)
      } else {
        await handleSignInSubmit(email, password)
      }
    },
    [isSignUp, handleSignInSubmit, handleSignUpSubmit],
  )

  return {
    isSignUp,
    showForgotPassword,
    isLoading,
    error,
    handleToggleMode,
    handleShowForgotPassword,
    handleBackToLogin,
    handleAuthSubmit,
  }
}
