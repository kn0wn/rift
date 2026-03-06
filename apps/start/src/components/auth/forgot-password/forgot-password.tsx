'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@rift/ui/button'
import { Label } from '@rift/ui/label'
import { Input } from '@rift/ui/input'
import {
  cardVariants,
  staggerChildVariants,
  menuCardContainerVariants,
  menuCardHeaderVariants,
  menuCardButtonVariants,
  menuCardContentVariants,
} from '@/lib/animations'
import { authClient } from '@/lib/auth/auth-client'

export type ForgotPasswordProps = {
  onBackToLogin: () => void
}

/**
 * Forgot-password flow: single email field and "Send reset link" / "Back".
 * Uses the same motion and card styling as the sign-in page.
 */
export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
      })

      if (result.error) {
        setError('Correo electrónico inválido')
        return
      }
      setSuccess(true)
    } catch {
      setError('Correo electrónico inválido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4"
      variants={menuCardContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="text-center mb-8"
        variants={menuCardHeaderVariants}
      >
        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          Restablecer Contraseña
        </h1>
        <p className="text-black/70 dark:text-white/60 text-lg mb-6">
          Ingresa tu correo electrónico para recibir un enlace de restablecimiento
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-emphasis/50 shadow-[0_0_1px_rgba(0,0,0,0.40),0_0_2px_rgba(0,0,0,0.05),0_10px_10px_rgba(0,0,0,0.25)] transition-colors duration-200"
        variants={menuCardContentVariants}
      >
        <div className="rounded-b-3xl bg-bg-muted p-8 shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.08)] transition-colors duration-200">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={staggerChildVariants} className="space-y-2 relative">
              <Label htmlFor="forgot-email" variant="muted">
                Correo Electrónico
              </Label>
              <Input
                id="forgot-email"
                type="email"
                variant="alt"
                inputSize="large"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                  if (success) setSuccess(false)
                }}
                disabled={isLoading}
                required
              />
              <div className="h-4 flex items-center">
                <AnimatePresence>
                  {error && (
                    <motion.p
                      className="absolute top-full left-0 text-red-500 dark:text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {error}
                    </motion.p>
                  )}
                  {success && (
                    <motion.p
                      className="absolute top-full left-0 text-green-600 dark:text-green-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      Enlace de restablecimiento enviado
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={menuCardButtonVariants}
          className="flex items-center justify-end gap-3 px-8 py-4 transition-colors duration-200"
        >
          <Button
            type="button"
            variant="ghost"
            size="large"
            onClick={onBackToLogin}
          >
            Volver
          </Button>
          <Button
            type="button"
            variant="default"
            size="large"
            onClick={handleEmailSubmit}
            disabled={!email || isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar Enlace'}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
