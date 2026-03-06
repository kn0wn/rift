'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@rift/ui/button'
import { Input } from '@rift/ui/input'
import { Label } from '@rift/ui/label'
import { cardVariants, staggerChildVariants } from '@/lib/animations'
import { GoogleIcon, MicrosoftIcon } from '@/components/icons/provider-icons'
import { authClient } from '@/lib/auth/auth-client'

export type LoginFormProps = {
  /** When true, shows sign-up fields (confirm password) and sign-up copy. */
  isSignUp?: boolean
  onToggleMode: () => void
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading: boolean
  error: string
  onForgotPassword?: () => void
}

const PASSWORD_MIN_LENGTH = 8

export function LoginForm({
  isSignUp = false,
  onToggleMode,
  onSubmit,
  isLoading: parentIsLoading,
  error: parentError,
  onForgotPassword,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await authClient.signIn.social(
        { provider: 'google' },
        {
          onError: (ctx) => {
            setEmailError(ctx.error?.message ?? 'Error al iniciar con Google')
            setIsGoogleLoading(false)
          },
        },
      )
    } catch {
      setIsGoogleLoading(false)
    }
  }

  const handleMicrosoftSignIn = async () => {
    setIsMicrosoftLoading(true)
    try {
      await authClient.signIn.social(
        { provider: 'microsoft' },
        {
          onError: (ctx) => {
            setEmailError(ctx.error?.message ?? 'Error al iniciar con Microsoft')
            setIsMicrosoftLoading(false)
          },
        },
      )
    } catch {
      setIsMicrosoftLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if (isSignUp) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setEmailError('Por favor ingresa una dirección de correo válida')
        return
      }
      if (password.length < PASSWORD_MIN_LENGTH) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres')
        return
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError('Las contraseñas no coinciden')
        return
      }
    }

    try {
      await onSubmit(email, password)
    } catch {
      const msg = isSignUp
        ? 'Error al crear la cuenta. Por favor intenta de nuevo.'
        : 'Credenciales inválidas'
      setEmailError(msg)
      setPasswordError(msg)
      if (isSignUp) setConfirmPasswordError(msg)
    }
  }

  useEffect(() => {
    if (!parentError) return
    if (emailError || passwordError || (isSignUp && confirmPasswordError)) return
    setEmailError(parentError)
    setPasswordError(parentError)
    if (isSignUp) setConfirmPasswordError(parentError)
  }, [parentError, isSignUp])

  return (
    <motion.div
      className="overflow-hidden rounded-3xl bg-emphasis/50 shadow-[0_0_1px_rgba(0,0,0,0.40),0_0_2px_rgba(0,0,0,0.05),0_10px_10px_rgba(0,0,0,0.25)] transition-colors duration-200"
      variants={cardVariants}
    >
      <div>
        <div className="rounded-b-3xl bg-bg-muted p-8 shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.08)] transition-colors duration-200">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl"
            autoComplete="on"
          >
        <motion.div variants={staggerChildVariants} className="space-y-2 relative">
          <Label htmlFor="email" variant="muted">
            Correo Electrónico
          </Label>
          <Input
            id="email"
            name="username"
            type="email"
            variant="alt"
            inputSize="large"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            disabled={parentIsLoading}
            autoComplete={isSignUp ? 'section-sign-up email' : 'section-sign-in username'}
            aria-invalid={!!emailError}
            required
          />
          <AnimatePresence>
            {emailError && (
              <motion.p
                className="absolute top-full left-0 text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {emailError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={staggerChildVariants} className="space-y-2 relative">
          <Label htmlFor="password" variant="muted">
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            variant="alt"
            inputSize="large"
            placeholder={isSignUp ? 'Crea una contraseña' : 'Ingresa tu contraseña'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            disabled={parentIsLoading}
            autoComplete={isSignUp ? 'section-sign-up new-password' : 'section-sign-in current-password'}
            aria-invalid={!!passwordError}
            required
          />
          <AnimatePresence>
            {passwordError && (
              <motion.p
                className="absolute top-full left-0 text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {passwordError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isSignUp && (
            <motion.div
              key="confirm-password"
              variants={staggerChildVariants}
              className="overflow-hidden"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: -32 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword" variant="muted">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirm-password"
                  type="password"
                  variant="alt"
                  inputSize="large"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (confirmPasswordError) setConfirmPasswordError('')
                  }}
                  disabled={parentIsLoading}
                  autoComplete="section-sign-up new-password"
                  aria-invalid={!!confirmPasswordError}
                  required={isSignUp}
                />
                <AnimatePresence>
                  {confirmPasswordError && (
                    <motion.p
                      className="absolute top-full left-0 text-red-500 dark:text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {confirmPasswordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={staggerChildVariants}
          className="flex items-center justify-between text-sm mt-8"
        >
          <div />
          <AnimatePresence>
            {!isSignUp && onForgotPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <Button type="button" variant="link" onClick={onForgotPassword}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={staggerChildVariants}>
          <Button
            type="submit"
            variant="primaryAlt"
            size="big"
            disabled={parentIsLoading}
          >
            {parentIsLoading
              ? 'Por favor espera...'
              : isSignUp
                ? 'Crear Cuenta'
                : 'Iniciar Sesión'}
          </Button>
        </motion.div>
          </form>

          <motion.div
            variants={staggerChildVariants}
            className="my-6 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-border-default" />
            <span className="text-sm text-content-muted">O</span>
            <div className="h-px flex-1 bg-border-default" />
          </motion.div>

          <motion.div variants={staggerChildVariants} className="space-y-3">
            <Button
              type="button"
              variant="outline"
              size="big"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isMicrosoftLoading || parentIsLoading}
            >
              <GoogleIcon className="mr-2.5 size-5" />
              {isGoogleLoading
                ? (isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...')
                : (isSignUp ? 'Registrarse con Google' : 'Iniciar sesión con Google')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="big"
              onClick={handleMicrosoftSignIn}
              disabled={isMicrosoftLoading || isGoogleLoading || parentIsLoading}
            >
              <MicrosoftIcon className="mr-2.5 size-5" />
              {isMicrosoftLoading
                ? (isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...')
                : (isSignUp ? 'Registrarse con Microsoft' : 'Iniciar sesión con Microsoft')}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={staggerChildVariants}
        className="flex items-center justify-center px-8 py-4 transition-colors duration-200"
      >
        <p className="text-center text-sm text-content-subtle">
          {isSignUp ? (
            <>
              ¿Ya tienes una cuenta?{' '}
              <Button type="button" onClick={onToggleMode} variant="link">
                Iniciar sesión
              </Button>
            </>
          ) : (
            <>
              ¿No tienes una cuenta?{' '}
              <Button type="button" onClick={onToggleMode} variant="link">
                Registrarse
              </Button>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}
