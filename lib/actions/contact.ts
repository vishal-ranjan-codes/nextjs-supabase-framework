'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['general', 'support', 'feedback', 'collaboration']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export async function submitContactAction(
  formData: FormData
): Promise<{ success: boolean; error?: string; data?: unknown }> {
  // Step 0: Rate limit
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(`contact:${ip}`).ok) {
    return { success: false, error: 'Too many requests. Please try again later.' }
  }

  // Step 1: Authenticate
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  // Step 2: Validate
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    const fieldError = parsed.error.errors[0]?.message ?? 'Invalid form data'
    return { success: false, error: fieldError }
  }

  // Step 3: Act
  try {
    // TODO: implement actual contact submission (e.g., send email, insert to DB)
    // const { error } = await supabase.from('contact_submissions').insert({ ...parsed.data, user_id: user.id })
    // if (error) throw error
  } catch (error) {
    void error
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
