import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import AuthForm from './AuthForm'

export default function SignInPage() {
  return (
    <div className="theme-bg-color min-h-screen flex items-center justify-center py-16 px-4">
      <Suspense fallback={
        <div className="box p-8 w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-12 mx-auto rounded-2xl" />
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      }>
        <AuthForm />
      </Suspense>
    </div>
  )
}
