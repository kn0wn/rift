/**
 * Better Auth CLI entrypoint.
 *
 * The deploy and reset scripts point the Better Auth CLI at this file so the
 * CLI can resolve the exact same auth instance that the app runtime uses.
 */

export { auth } from './services/auth.service'
export { auth as default } from './services/auth.service'
