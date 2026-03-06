'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useSignInPageLogic } from './sign-in-page.logic'
import { LoginHeader } from './login-header'
import { LoginForm } from './login-form'
import { LegalLinks } from './legal-links'
import { ForgotPassword } from '@/components/auth/forgot-password'
import { menuCardContainerVariants } from '@/lib/animations'

export type SignInPageProps = {
  redirectTarget: string
  initialMode?: 'sign-in' | 'sign-up'
}

/**
 * Combined sign-in/sign-up page: single component with one form card.
 * Toggling mode updates content in place with smooth animations (no remount).
 * Matches reference: one AnimatePresence (forgot vs login-form), single submit handler.
 */
export function SignInPage({ redirectTarget, initialMode = 'sign-in' }: SignInPageProps) {
  const {
    isSignUp,
    showForgotPassword,
    isLoading,
    error,
    handleToggleMode,
    handleShowForgotPassword,
    handleBackToLogin,
    handleAuthSubmit,
  } = useSignInPageLogic(redirectTarget, initialMode)

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#2A2929] flex items-center justify-center px-4 relative overflow-hidden">
      <img
        src="/shadowfull.webp"
        alt=""
        className="absolute top-0 left-0 w-full h-full z-0 mix-blend-multiply object-cover pointer-events-none dark:hidden"
        aria-hidden
      />

      <AnimatePresence>
        {showForgotPassword ? (
          <motion.div
            key="forgot-password"
            className="fixed inset-0 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 z-10"
            variants={menuCardContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <ForgotPassword onBackToLogin={handleBackToLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            className="relative z-10 w-full max-w-md"
            variants={menuCardContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <LoginHeader isSignUp={isSignUp} />
            <LoginForm
              isSignUp={isSignUp}
              onToggleMode={handleToggleMode}
              onSubmit={handleAuthSubmit}
              isLoading={isLoading}
              error={error}
              onForgotPassword={handleShowForgotPassword}
            />
            <LegalLinks isSignUp={isSignUp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
