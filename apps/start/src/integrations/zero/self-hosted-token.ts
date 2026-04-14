import { useCallback, useEffect, useMemo, useState } from 'react'

type ZeroSelfHostedTokenResponse = {
  readonly token: string
  readonly expiresAt: string
}

type ZeroSelfHostedTokenState = {
  readonly token?: string
  readonly expiresAt?: string
  readonly loading: boolean
}

export function useZeroSelfHostedAccessToken(input: {
  readonly enabled: boolean
  readonly userID?: string
  readonly organizationId?: string
}): {
  readonly ready: boolean
  readonly token?: string
} {
  const [state, setState] = useState<ZeroSelfHostedTokenState>({
    loading: input.enabled,
  })

  const subjectKey = useMemo(
    () => `${input.userID ?? ''}:${input.organizationId ?? ''}`,
    [input.userID, input.organizationId],
  )

  const fetchToken = useCallback(
    async (options?: {
      readonly signal?: AbortSignal
      readonly preserveExisting?: boolean
    }) => {
      if (!options?.preserveExisting) {
        setState({ loading: true })
      }

      try {
        const response = await fetch('/api/zero/token', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
          signal: options?.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch Zero token (${response.status}).`)
        }

        const payload = (await response.json()) as ZeroSelfHostedTokenResponse

        if (!payload?.token || !payload?.expiresAt) {
          throw new Error('Malformed Zero token response.')
        }

        setState({
          token: payload.token,
          expiresAt: payload.expiresAt,
          loading: false,
        })
      } catch (error) {
        if (options?.signal?.aborted) {
          return
        }

        console.error('Failed to fetch self-hosted Zero token', error)

        setState((previous) =>
          options?.preserveExisting
            ? {
                token: previous.token,
                expiresAt: previous.expiresAt,
                loading: false,
              }
            : { loading: false },
        )
      }
    },
    [],
  )

  useEffect(() => {
    if (!input.enabled || !input.userID) {
      setState({ loading: false })
      return
    }

    const controller = new AbortController()
    void fetchToken({ signal: controller.signal, preserveExisting: false })

    return () => controller.abort()
  }, [input.enabled, subjectKey, fetchToken, input.userID])

  useEffect(() => {
    if (!input.enabled || !state.token || !state.expiresAt) {
      return
    }

    const refreshDelayMs = Math.max(
      5_000,
      new Date(state.expiresAt).getTime() - Date.now() - 60_000,
    )

    const timeout = window.setTimeout(() => {
      void fetchToken({ preserveExisting: true })
    }, refreshDelayMs)

    return () => window.clearTimeout(timeout)
  }, [input.enabled, state.token, state.expiresAt, fetchToken])

  return {
    ready: !input.enabled || Boolean(state.token),
    token: state.token,
  }
}
