import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Skeleton } from '@/components/ui/skeleton'

async function DashboardGuard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="theme-bg-color min-h-screen py-16">
      <div className="container">
        <h1 className="theme-h1 mb-4">Dashboard</h1>
        <p className="theme-fc-light">
          You are authenticated. Your user ID is: <code className="theme-fc-base">{user.id}</code>
        </p>
        {/* TODO: Add your authenticated app content here */}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Skeleton className="min-h-screen" />}>
      <DashboardGuard />
    </Suspense>
  )
}
