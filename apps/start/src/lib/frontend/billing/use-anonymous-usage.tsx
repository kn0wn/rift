'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { useAppAuth } from '@/lib/frontend/auth/use-auth'
import { getOrgUsageSummary } from './org-usage-summary.functions'
import type { OrgUsageSummary } from './org-usage-summary.server'
import { getNextUsageLabelTickAt } from './use-org-usage'

function asError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

function getErrorTag(error: unknown): string | null {
  if (
    typeof error === 'object'
    && error !== null
    && '_tag' in error
    && typeof (error as { _tag: unknown })._tag === 'string'
  ) {
    return (error as { _tag: string })._tag
  }

  if (
    typeof error === 'object'
    && error !== null
    && 'name' in error
    && typeof (error as { name: unknown }).name === 'string'
  ) {
    return (error as { name: string }).name
  }

  return null
}

function isTerminalRefreshError(error: unknown): boolean {
  return getErrorTag(error) === 'WorkspaceBillingUnauthorizedError'
}

const REFRESH_RETRY_DELAY_MS = 30_000

/**
 * Anonymous usage is entirely user-scoped, so the sidebar can fetch it
 * directly without depending on organization selection or Zero hydration.
 */
export function useAnonymousUsageSummary() {
  const { user, isAnonymous } = useAppAuth()
  const enabled = Boolean(user?.id) && isAnonymous
  const getAnonymousUsageSummaryFn = useServerFn(getOrgUsageSummary)
  const requestIdRef = useRef(0)
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled
  const [summary, setSummary] = useState<OrgUsageSummary | null>(null)
  const [ensuring, setEnsuring] = useState(false)
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [retryAtMs, setRetryAtMs] = useState<number | null>(null)
  const [lastRefreshError, setLastRefreshError] = useState<Error | null>(null)
  const terminalRefreshRef = useRef(false)
  const summaryRefreshAt = summary?.monthlyResetAt ?? null

  const refresh = useCallback(async () => {
    if (!enabledRef.current) return

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setEnsuring(true)

    try {
      const next = await getAnonymousUsageSummaryFn({ data: undefined })
      if (requestId !== requestIdRef.current || !enabledRef.current) {
        return
      }

      setSummary(next)
      setNowMs(Date.now())
      terminalRefreshRef.current = false
      setRetryAtMs(null)
      setLastRefreshError(null)
    } catch (nextError) {
      if (requestId !== requestIdRef.current || !enabledRef.current) {
        return
      }

      const evaluatedAt = Date.now()
      setNowMs(evaluatedAt)
      if (isTerminalRefreshError(nextError)) {
        terminalRefreshRef.current = true
        setRetryAtMs(null)
      } else {
        setRetryAtMs(evaluatedAt + REFRESH_RETRY_DELAY_MS)
      }
      setLastRefreshError(asError(nextError))
    } finally {
      if (requestId === requestIdRef.current) {
        setEnsuring(false)
      }
    }
  }, [getAnonymousUsageSummaryFn])

  useEffect(() => {
    requestIdRef.current += 1
    terminalRefreshRef.current = false
    setSummary(null)
    setEnsuring(false)
    setNowMs(Date.now())
    setRetryAtMs(null)
    setLastRefreshError(null)
  }, [enabled, user?.id])

  useEffect(() => {
    const nextTickAt = getNextUsageLabelTickAt(summary?.monthlyResetAt, nowMs)
    if (nextTickAt == null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setNowMs(Date.now())
    }, Math.max(250, nextTickAt - Date.now() + 250))

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [nowMs, summary?.monthlyResetAt])

  useEffect(() => {
    if (
      !enabled
      || summary != null
      || ensuring
      || terminalRefreshRef.current
      || (retryAtMs != null && retryAtMs > Date.now())
    ) {
      return
    }

    void refresh()
  }, [enabled, ensuring, refresh, retryAtMs, summary])

  useEffect(() => {
    if (
      !enabled
      || summaryRefreshAt == null
      || ensuring
      || summaryRefreshAt > Date.now()
      || terminalRefreshRef.current
      || (retryAtMs != null && retryAtMs > Date.now())
    ) {
      return
    }

    void refresh()
  }, [enabled, ensuring, refresh, retryAtMs, summaryRefreshAt])

  useEffect(() => {
    if (
      !enabled
      || summaryRefreshAt == null
      || terminalRefreshRef.current
      || (retryAtMs != null && retryAtMs > Date.now())
    ) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      void refresh()
    }, Math.max(250, summaryRefreshAt - Date.now() + 250))

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [enabled, refresh, retryAtMs, summaryRefreshAt])

  useEffect(() => {
    if (!enabled || retryAtMs == null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      void refresh()
    }, Math.max(250, retryAtMs - Date.now()))

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [enabled, refresh, retryAtMs])

  useEffect(() => {
    if (!lastRefreshError) {
      return
    }

    console.error('Failed to refresh anonymous usage summary', lastRefreshError)
  }, [lastRefreshError])

  return {
    summary,
    nowMs,
    loading: enabled && summary == null && ensuring,
  }
}
