// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { navigateToSection, handleHashNavigation, shouldScroll } from '@/lib/utils/navigation'

// Mock the scroll module
vi.mock('@/lib/utils/scroll', () => ({
  smoothScrollTo: vi.fn(),
}))

import { smoothScrollTo } from '@/lib/utils/scroll'

describe('navigateToSection', () => {
  const mockRouter = { push: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('scrolls to section when on homepage', () => {
    navigateToSection('features', '/', mockRouter)
    expect(smoothScrollTo).toHaveBeenCalledWith('features')
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('navigates to homepage with hash when on other pages', () => {
    navigateToSection('features', '/about', mockRouter)
    expect(mockRouter.push).toHaveBeenCalledWith('/#features')
    expect(smoothScrollTo).not.toHaveBeenCalled()
  })

  it('navigates to homepage with hash from nested path', () => {
    navigateToSection('contact', '/blog/post-1', mockRouter)
    expect(mockRouter.push).toHaveBeenCalledWith('/#contact')
  })
})

describe('handleHashNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('scrolls to hash element after delay', () => {
    window.location.hash = '#features'
    handleHashNavigation()
    expect(smoothScrollTo).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(smoothScrollTo).toHaveBeenCalledWith('features')
  })

  it('does nothing when no hash present', () => {
    window.location.hash = ''
    handleHashNavigation()
    vi.advanceTimersByTime(200)
    expect(smoothScrollTo).not.toHaveBeenCalled()
  })
})

describe('shouldScroll', () => {
  it('returns true when href starts with # and on homepage', () => {
    expect(shouldScroll('#features', '/')).toBe(true)
  })

  it('returns false when href starts with # but not on homepage', () => {
    expect(shouldScroll('#features', '/about')).toBe(false)
  })

  it('returns false when href does not start with #', () => {
    expect(shouldScroll('/about', '/')).toBe(false)
  })

  it('returns false for absolute URLs', () => {
    expect(shouldScroll('https://example.com', '/')).toBe(false)
  })
})
