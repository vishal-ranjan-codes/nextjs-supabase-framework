import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/server'

async function SignInGuard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="theme-bg-color min-h-screen flex items-center justify-center py-16">
      <div className="box p-8 w-full max-w-md">
        <h1 className="theme-h2 mb-2 text-center">Sign In</h1>
        <p className="theme-fc-light text-center mb-8">
          Sign in to your account to continue.
        </p>
        {/* TODO: Add your sign-in form or OAuth buttons here */}
        <p className="theme-fc-light text-sm text-center">
          Authentication UI goes here.
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="theme-bg-color min-h-screen flex items-center justify-center py-16">
        <div className="box p-8 w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    }>
      <SignInGuard />
    </Suspense>
  )
}
