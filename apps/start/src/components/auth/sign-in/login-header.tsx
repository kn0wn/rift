'use client'

import { motion } from 'motion/react'
import { menuCardHeaderVariants } from '@/lib/animations'

export type LoginHeaderProps = {
  isSignUp: boolean
}

/**
 * Header block for the sign-in/sign-up page.
 * Shows "Bienvenido de Vuelta" for sign-in and "Crear Cuenta" for sign-up.
 */
export function LoginHeader({ isSignUp }: LoginHeaderProps) {
  return (
    <motion.div
      className="text-center mb-8"
      variants={menuCardHeaderVariants}
    >
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        {isSignUp ? 'Crear Cuenta' : 'Bienvenido de Vuelta'}
      </h1>
      <p className="text-black/70 dark:text-white/60 text-lg mb-6">
        {isSignUp
          ? 'Regístrate para tu Unify Dashboard'
          : 'Inicia sesión en tu Unify Dashboard'}
      </p>
    </motion.div>
  )
}
