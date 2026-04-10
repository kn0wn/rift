import { describe, expect, it } from 'vitest'
import {
  formatCitationHostname,
  formatInlineCitationTitle,
  isInlineCitationSourceLabel,
  parseInlineCitationLabel,
} from './inline-citation'

describe('inline citation helpers', () => {
  it('detects citation labels from markdown link text', () => {
    expect(parseInlineCitationLabel('[1]')).toBe('1')
    expect(parseInlineCitationLabel(' [24] ')).toBe('24')
  })

  it('ignores non-citation labels so regular links keep their default rendering', () => {
    expect(parseInlineCitationLabel('1')).toBeNull()
    expect(parseInlineCitationLabel('[source]')).toBeNull()
    expect(parseInlineCitationLabel('[1][2]')).toBeNull()
  })

  it('detects compact domain labels as inline source citations', () => {
    expect(isInlineCitationSourceLabel('mexicodailypost.news')).toBe(true)
    expect(isInlineCitationSourceLabel('wsj.com')).toBe(true)
    expect(isInlineCitationSourceLabel('Read more')).toBe(false)
    expect(isInlineCitationSourceLabel('source 1')).toBe(false)
  })

  it('formats a compact source title from the citation url', () => {
    expect(formatCitationHostname('https://www.nmas.com.mx/story')).toBe(
      'nmas.com.mx',
    )
    expect(formatInlineCitationTitle('https://x.com/i/status/123')).toBe(
      'X',
    )
    expect(
      formatInlineCitationTitle('https://www.youtube.com/watch?v=123'),
    ).toBe('Youtube')
    expect(
      formatInlineCitationTitle('https://www.wsj.com/business/story'),
    ).toBe('Wsj')
    expect(
      formatInlineCitationTitle('https://www.nmas.com.mx/story'),
    ).toBe('Nmas')
    expect(
      formatInlineCitationTitle('https://en.wikipedia.com/wiki/Mexico'),
    ).toBe('Wikipedia')
    expect(
      formatInlineCitationTitle('https://www.bbc.co.uk/news'),
    ).toBe('Bbc')
  })

  it('falls back gracefully when the source is not a valid url', () => {
    expect(formatCitationHostname('not-a-url')).toBe('not-a-url')
    expect(formatInlineCitationTitle('not-a-url')).toBe('Not-a-url')
  })
})
