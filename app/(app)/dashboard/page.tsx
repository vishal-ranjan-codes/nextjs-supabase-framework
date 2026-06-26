import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { signOutFormAction } from '@/lib/actions/auth'
import { LayoutDashboard, LogOut, User, Shield, Key } from 'lucide-react'

async function DashboardContent() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/sign-in?error=session_expired&error_description=Your+session+has+expired.+Please+sign+in+again.')
  }

  return (
    <div className="theme-bg-color min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="theme-h1 text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="theme-fc-light text-sm">Welcome back to your dashboard panel</p>
            </div>
          </div>

          <form action={signOutFormAction}>
            <Button type="submit" variant="outline" className="gap-2 border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="box p-6 md:col-span-2 space-y-6">
            <h2 className="theme-h3 font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <span className="text-xs theme-fc-light uppercase tracking-wider font-semibold">Email Address</span>
                <p className="theme-fc-base font-medium break-all">{user.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs theme-fc-light uppercase tracking-wider font-semibold">User ID</span>
                <p className="theme-fc-base font-mono text-sm break-all">{user.id}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs theme-fc-light uppercase tracking-wider font-semibold">Last Sign In</span>
                <p className="theme-fc-base font-medium">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs theme-fc-light uppercase tracking-wider font-semibold">Account Created</span>
                <p className="theme-fc-base font-medium">
                  {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Security Status Card */}
          <div className="box p-6 space-y-6">
            <h2 className="theme-h3 font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-sm">✓</div>
                <div>
                  <p className="theme-fc-heading text-sm font-semibold">Active Session</p>
                  <p className="theme-fc-light text-xs">Your session is secure & verified</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <p className="theme-fc-heading text-sm font-semibold">JWT Token Auto-refresh</p>
                  <p className="theme-fc-light text-xs">Refreshed automatically at the edge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="theme-bg-color min-h-screen py-16 px-4">
        <div className="container max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-64 md:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
