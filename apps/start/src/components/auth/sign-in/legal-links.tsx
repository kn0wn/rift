'use client'

import { motion } from 'motion/react'
import { staggerChildVariants } from '@/lib/animations'

export type LegalLinksProps = {
  isSignUp: boolean
}

const linkClassName =
  'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'

/**
 * Legal links section: terms, acceptable use, and privacy policy.
 */
export function LegalLinks({ isSignUp }: LegalLinksProps) {
  return (
    <motion.div
      variants={staggerChildVariants}
      className="text-center mt-6"
    >
      <p className="text-[10px] text-black/60 dark:text-white/60 leading-relaxed">
        {isSignUp ? (
          <>
            Al registrarte, aceptas nuestros{' '}
            <a href="/legal/terms" className={linkClassName}>
              Términos
            </a>
            ,{' '}
            <a href="/legal/acceptable-use" className={linkClassName}>
              Uso Aceptable
            </a>
            , y{' '}
            <a href="/legal/privacy" className={linkClassName}>
              Política de Privacidad
            </a>
            .
          </>
        ) : (
          <>
            Al iniciar sesión, aceptas nuestros{' '}
            <a href="/legal/terms" className={linkClassName}>
              Términos
            </a>
            ,{' '}
            <a href="/legal/acceptable-use" className={linkClassName}>
              Uso Aceptable
            </a>
            , y{' '}
            <a href="/legal/privacy" className={linkClassName}>
              Política de Privacidad
            </a>
            .
          </>
        )}
      </p>
    </motion.div>
  )
}
