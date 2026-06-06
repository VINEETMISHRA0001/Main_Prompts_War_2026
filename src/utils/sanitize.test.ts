import { describe, it, expect } from 'vitest'
import { escapeHtml, sanitizeInput } from '@/utils/sanitize'

describe('sanitize', () => {
  it('escapes HTML entities', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('trims and caps length', () => {
    expect(sanitizeInput('  hello  ', 3)).toBe('hel')
  })

  it('prevents XSS in journal content', () => {
    const raw = '<img src=x onerror=alert(1)>'
    expect(sanitizeInput(raw)).not.toContain('<img')
  })
})
