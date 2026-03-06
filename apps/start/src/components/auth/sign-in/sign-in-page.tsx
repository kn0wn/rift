'use client'

import { AnimatePresence, motion } from 'motion/react'
import { m } from '@/paraglide/messages.js'
import { useSignInPageLogic } from './sign-in-page.logic'
import { LoginHeader } from './login-header'
import { LoginForm } from './login-form'
import { LegalLinks } from './legal-links'
import { ForgotPassword } from '@/components/auth/forgot-password'
import { OtpStep } from '@/components/auth/otp-step'
import { menuCardContainerVariants } from '@/lib/animations'

export type SignInPageProps = {
  redirectTarget: string
  initialMode?: 'sign-in' | 'sign-up'
}

/**
 * Combined auth surface for sign-in, sign-up, account recovery, and
 * verification steps that may happen before a session is fully established.
 */
export function SignInPage({ redirectTarget, initialMode = 'sign-in' }: SignInPageProps) {
  const {
    view,
    isSignUp,
    pendingVerificationEmail,
    pendingMfaEmail,
    verificationMessage,
    otpSentAt,
    otpExpiresInSeconds,
    isLoading,
    error,
    clearError,
    handleToggleMode,
    handleShowForgotPassword,
    handleBackToLogin,
    handleAuthSubmit,
    handleVerifyEmailOtp,
    handleVerifyMfaTotp,
    handleResendVerificationOtp,
    handleBackFromMfa,
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
        {view === 'forgot-password' ? (
          <ForgotPassword
            key="forgot-password"
            redirectTarget={redirectTarget}
            onBackToLogin={handleBackToLogin}
          />
        ) : view === 'email-verification' ? (
          <OtpStep
            key="email-verification"
            title={m.auth_email_verification_title()}
            description={m.auth_email_verification_description()}
            instruction={m.auth_email_verification_instruction({ email: pendingVerificationEmail })}
            message={verificationMessage}
            formId="email-verification-form"
            otpSentAt={otpSentAt}
            otpExpiresInSeconds={otpExpiresInSeconds}
            error={error}
            isLoading={isLoading}
            onClearError={clearError}
            onSubmit={handleVerifyEmailOtp}
            onResend={handleResendVerificationOtp}
            submitText={m.auth_email_verification_submit()}
            resendText={m.auth_email_verification_resend()}
          />
        ) : view === 'mfa-verification' ? (
          <OtpStep
            key="mfa-verification"
            title={m.auth_mfa_title()}
            description={m.auth_mfa_description()}
            instruction={m.auth_mfa_instruction({ email: pendingMfaEmail })}
            formId="mfa-verification-form"
            error={error}
            isLoading={isLoading}
            onClearError={clearError}
            onSubmit={handleVerifyMfaTotp}
            onBack={handleBackFromMfa}
            submitText={m.auth_mfa_submit()}
            backText={m.auth_mfa_back()}
          />
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
