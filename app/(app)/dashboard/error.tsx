'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="theme-bg-color min-h-screen flex items-center justify-center py-16 px-4">
      <div className="box p-8 max-w-md text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-destructive/10 text-destructive">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="theme-h3">Something went wrong</h2>
        <p className="theme-fc-light text-sm">
          {error.message || 'An unexpected error occurred while loading the dashboard.'}
        </p>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  )
}
