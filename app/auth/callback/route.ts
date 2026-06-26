import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    const redirectUrl = new URL('/sign-in', origin)
    redirectUrl.searchParams.set('error', 'missing_code')
    redirectUrl.searchParams.set('error_description', 'No authorization code was provided in the callback.')
    return NextResponse.redirect(redirectUrl)
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      const redirectUrl = new URL('/sign-in', origin)
      redirectUrl.searchParams.set('error', 'exchange_failed')
      redirectUrl.searchParams.set('error_description', error.message)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.redirect(`${origin}/dashboard`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred during authentication.'
    const redirectUrl = new URL('/sign-in', origin)
    redirectUrl.searchParams.set('error', 'callback_exception')
    redirectUrl.searchParams.set('error_description', message)
    return NextResponse.redirect(redirectUrl)
  }
}
