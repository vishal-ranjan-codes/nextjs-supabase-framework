'use client'

import { useActionState, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'
import { signInWithEmailAction, signUpWithEmailAction } from '@/lib/actions/auth'

export default function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showSignInPassword, setShowSignInPassword] = useState(false)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

  // Sign In Action state
  const [signInState, signInAction, isSignInPending] = useActionState(
    signInWithEmailAction,
    null
  )

  // Sign Up Action state
  const [signUpState, signUpAction, isSignUpPending] = useActionState(
    signUpWithEmailAction,
    null
  )

  // Handle toast notifications on response
  useEffect(() => {
    if (signInState) {
      if (signInState.success) {
        toast.success(signInState.message || 'Logged in successfully!')
        const next = searchParams.get('next') || '/dashboard'
        router.push(next)
        router.refresh()
      } else if (signInState.error) {
        toast.error(signInState.error)
      }
    }
  }, [signInState, router, searchParams])

  useEffect(() => {
    if (signUpState) {
      if (signUpState.success) {
        toast.success(signUpState.message || 'Registration successful!')
        if (signUpState.message?.includes('check your email')) {
          // If verification is needed, defer updating active tab to avoid ESLint warning
          setTimeout(() => {
            setActiveTab('signin')
          }, 0)
        } else {
          router.push('/dashboard')
          router.refresh()
        }
      } else if (signUpState.error) {
        toast.error(signUpState.error)
      }
    }
  }, [signUpState, router])

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Visual Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="theme-h2 text-3xl font-bold tracking-tight mb-2">Welcome</h1>
        <p className="theme-fc-light text-sm">
          Access the Next.js + Supabase dashboard
        </p>
      </div>

      <div className="box p-6 sm:p-8 backdrop-blur-md bg-opacity-70 theme-border-color border shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
        
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin" className="space-y-4 focus-visible:outline-none">
            <form action={signInAction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email Address</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </span>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    disabled={isSignInPending}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input
                    id="signin-password"
                    name="password"
                    type={showSignInPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    disabled={isSignInPending}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  >
                    {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isSignInPending}>
                {isSignInPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4 focus-visible:outline-none">
            <form action={signUpAction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </span>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    disabled={isSignUpPending}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input
                    id="signup-password"
                    name="password"
                    type={showSignUpPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    required
                    disabled={isSignUpPending}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  >
                    {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isSignUpPending}>
                {isSignUpPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
