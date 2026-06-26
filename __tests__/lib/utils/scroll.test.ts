// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { smoothScrollTo, getCurrentSection, isInViewport, scrollToTop } from '@/lib/utils/scroll'

describe('smoothScrollTo', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('scrolls to element with header offset', () => {
    const el = document.createElement('div')
    el.id = 'target'
    document.body.appendChild(el)

    // Mock getBoundingClientRect
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      left: 0,
      bottom: 600,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 500,
      toJSON: () => ({}),
    })

    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    smoothScrollTo('target')

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 420, // 500 + 0 - 80 (headerOffset)
      behavior: 'smooth',
    })
  })

  it('does nothing if element not found', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    smoothScrollTo('nonexistent')
    expect(scrollToSpy).not.toHaveBeenCalled()
  })
})

describe('getCurrentSection', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns the last section above scroll position', () => {
    const sections = ['section1', 'section2', 'section3']
    sections.forEach((id, index) => {
      const el = document.createElement('div')
      el.id = id
      Object.defineProperty(el, 'offsetTop', { value: index * 500 })
      document.body.appendChild(el)
    })

    Object.defineProperty(window, 'scrollY', { value: 550, writable: true })

    const result = getCurrentSection(sections)
    expect(result).toBe('section2')
  })

  it('returns first section when at top', () => {
    const sections = ['section1', 'section2']
    sections.forEach((id, index) => {
      const el = document.createElement('div')
      el.id = id
      Object.defineProperty(el, 'offsetTop', { value: (index + 1) * 500 })
      document.body.appendChild(el)
    })

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })

    const result = getCurrentSection(sections)
    expect(result).toBe('section1')
  })

  it('returns null for empty sections array', () => {
    const result = getCurrentSection([])
    expect(result).toBeNull()
  })
})

describe('isInViewport', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns true when element is fully in viewport', () => {
    const el = document.createElement('div')
    el.id = 'visible'
    document.body.appendChild(el)

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      bottom: 200,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    })

    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })

    expect(isInViewport('visible')).toBe(true)
  })

  it('returns false when element is below viewport', () => {
    const el = document.createElement('div')
    el.id = 'below'
    document.body.appendChild(el)

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 1000,
      left: 0,
      bottom: 1100,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 1000,
      toJSON: () => ({}),
    })

    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })

    expect(isInViewport('below')).toBe(false)
  })

  it('returns false when element does not exist', () => {
    expect(isInViewport('nonexistent')).toBe(false)
  })
})

describe('scrollToTop', () => {
  it('scrolls to top with smooth behavior', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollToTop()
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
