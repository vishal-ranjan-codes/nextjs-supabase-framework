import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock @supabase/ssr
const mockGetUser = vi.fn()
const mockCreateServerClient = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createServerClient: (...args: unknown[]) => mockCreateServerClient(...args),
}))

// Mock next/server
const mockRedirect = vi.fn()

vi.mock('next/server', () => {
  class MockNextResponse {
    cookies: { set: ReturnType<typeof vi.fn> }
    constructor() {
      this.cookies = { set: vi.fn() }
    }
    static next({ request }: { request: unknown }) {
      const resp = new MockNextResponse()
      ;(resp as Record<string, unknown>)._request = request
      return resp
    }
    static redirect(url: unknown) {
      mockRedirect(url)
      return new MockNextResponse()
    }
  }
  return {
    NextResponse: MockNextResponse,
  }
})

import { proxy } from '@/proxy'

function createMockRequest(pathname: string) {
  const cookies = new Map<string, string>()
  return {
    cookies: {
      getAll: () => Array.from(cookies.entries()).map(([name, value]) => ({ name, value })),
      set: (name: string, value: string) => cookies.set(name, value),
    },
    nextUrl: {
      pathname,
      clone: () => ({ pathname }),
    },
  } as unknown as Parameters<typeof proxy>[0]
}

describe('proxy middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateServerClient.mockImplementation(() => {
      return {
        auth: {
          getUser: mockGetUser,
        },
      }
    })
  })

  it('allows unauthenticated access to public paths', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('allows unauthenticated access to /about', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/about')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('allows unauthenticated access to /contact', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/contact')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('allows unauthenticated access to /design-system', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/design-system')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('allows unauthenticated access to /auth paths', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/auth/callback')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('redirects unauthenticated users to /sign-in for protected paths', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/dashboard')
    await proxy(request)

    expect(mockRedirect).toHaveBeenCalled()
    const redirectUrl = mockRedirect.mock.calls[0][0]
    expect(redirectUrl.pathname).toBe('/sign-in')
  })

  it('redirects authenticated users from /sign-in to /dashboard', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })

    const request = createMockRequest('/sign-in')
    await proxy(request)

    expect(mockRedirect).toHaveBeenCalled()
    const redirectUrl = mockRedirect.mock.calls[0][0]
    expect(redirectUrl.pathname).toBe('/dashboard')
  })

  it('allows authenticated users to access protected paths', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })

    const request = createMockRequest('/dashboard')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('allows authenticated users to access public paths', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })

    const request = createMockRequest('/about')
    const response = await proxy(request)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('creates Supabase client with correct env vars', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const request = createMockRequest('/')
    await proxy(request)

    expect(mockCreateServerClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      })
    )
  })
})
