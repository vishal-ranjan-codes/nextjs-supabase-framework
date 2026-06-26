import { describe, it, expect } from 'vitest'
import { generateSlug, ensureUniqueSlug } from '@/lib/utils/slug'

describe('generateSlug', () => {
  it('converts text to lowercase', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(generateSlug('foo bar baz')).toBe('foo-bar-baz')
  })

  it('removes special characters', () => {
    expect(generateSlug('Hello! @World# $2024')).toBe('hello-world-2024')
  })

  it('collapses multiple hyphens into one', () => {
    expect(generateSlug('foo---bar')).toBe('foo-bar')
  })

  it('removes leading and trailing hyphens', () => {
    expect(generateSlug('  --hello--  ')).toBe('hello')
  })

  it('trims whitespace', () => {
    expect(generateSlug('  hello world  ')).toBe('hello-world')
  })

  it('handles empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('handles strings with only special characters', () => {
    expect(generateSlug('!@#$%')).toBe('')
  })

  it('preserves numbers', () => {
    expect(generateSlug('Product 123')).toBe('product-123')
  })

  it('handles underscores as word characters', () => {
    expect(generateSlug('hello_world test')).toBe('hello_world-test')
  })

  it('handles multiple spaces between words', () => {
    expect(generateSlug('hello    world')).toBe('hello-world')
  })

  it('handles mixed case and special characters', () => {
    expect(generateSlug('My Blog Post! (2024)')).toBe('my-blog-post-2024')
  })
})

describe('ensureUniqueSlug', () => {
  it('returns the slug immediately if unique', async () => {
    const checkUnique = async () => true
    const result = await ensureUniqueSlug('my-slug', checkUnique)
    expect(result).toBe('my-slug')
  })

  it('appends incrementing numbers when slug exists', async () => {
    let callCount = 0
    const checkUnique = async (slug: string) => {
      callCount++
      return slug === 'my-slug-2'
    }
    const result = await ensureUniqueSlug('my-slug', checkUnique)
    expect(result).toBe('my-slug-2')
    expect(callCount).toBe(3) // my-slug, my-slug-1, my-slug-2
  })

  it('falls back to timestamp when maxAttempts exceeded', async () => {
    const checkUnique = async () => false
    const before = Date.now()
    const result = await ensureUniqueSlug('my-slug', checkUnique, 3)
    const after = Date.now()

    expect(result).toMatch(/^my-slug-\d+$/)
    const timestamp = parseInt(result.split('-').pop()!)
    expect(timestamp).toBeGreaterThanOrEqual(before)
    expect(timestamp).toBeLessThanOrEqual(after)
  })

  it('respects custom maxAttempts', async () => {
    let callCount = 0
    const checkUnique = async () => {
      callCount++
      return false
    }
    await ensureUniqueSlug('slug', checkUnique, 5)
    expect(callCount).toBe(5)
  })

  it('uses default maxAttempts of 10', async () => {
    let callCount = 0
    const checkUnique = async () => {
      callCount++
      return false
    }
    await ensureUniqueSlug('slug', checkUnique)
    expect(callCount).toBe(10)
  })
})
