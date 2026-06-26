import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes via clsx', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })

  it('deduplicates tailwind classes via twMerge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })

  it('handles undefined and null inputs', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('merges conflicting tailwind utilities correctly', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles arrays of class names', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('handles object syntax from clsx', () => {
    expect(cn({ hidden: true, visible: false })).toBe('hidden')
  })
})
