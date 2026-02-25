import { Cause, Effect, Exit, Option } from 'effect'
import { FileLiveLayer } from './live'

export function runFileEffect<TValue, TError, TRequirements>(
  effect: Effect.Effect<TValue, TError, TRequirements>,
) {
  return Effect.runPromiseExit(
    effect.pipe(Effect.provide(FileLiveLayer as never)) as Effect.Effect<
      TValue,
      TError,
      never
    >,
  ).then((exit) => {
    if (Exit.isSuccess(exit)) {
      return exit.value
    }

    const failure = Cause.findErrorOption(exit.cause)
    if (Option.isSome(failure)) {
      throw failure.value
    }

    throw Cause.squash(exit.cause)
  })
}

