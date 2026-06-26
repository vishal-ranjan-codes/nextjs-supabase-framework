'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { rateLimit } from '@/lib/rate-limit'

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type ActionState = {
  success: boolean
  error?: string
  message?: string
}

async function getClientIp(): Promise<string> {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function signInWithEmailAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const ip = await getClientIp()
  if (!rateLimit(`sign-in:${ip}`).ok) {
    return { success: false, error: 'Too many requests. Please try again later.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate fields
  const parsed = SignInSchema.safeParse({ email, password })
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? 'Invalid form data',
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard', 'layout')
    return { success: true, message: 'Logged in successfully!' }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return { success: false, error: message }
  }
}

export async function signUpWithEmailAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const ip = await getClientIp()
  if (!rateLimit(`sign-up:${ip}`).ok) {
    return { success: false, error: 'Too many requests. Please try again later.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate fields
  const parsed = SignUpSchema.safeParse({ email, password })
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? 'Invalid form data',
    }
  }

  try {
    const supabase = await createClient()
    const redirectToUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectToUrl,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Check if the user session is immediately active (if email confirmation is disabled in Supabase config)
    if (data.session) {
      revalidatePath('/dashboard', 'layout')
      return { success: true, message: 'Signed up and logged in successfully!' }
    }

    return {
      success: true,
      message: 'Registration successful! Please check your email to confirm your account.',
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return { success: false, error: message }
  }
}

export async function signOutAction(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
  } catch {
    // Sign-out failure is non-critical; swallow to avoid leaking details
  }
}
