'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['general', 'support', 'feedback', 'collaboration']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export async function submitContactAction(
  formData: FormData
): Promise<{ success: boolean; error?: string; data?: unknown }> {
  // Step 1: Authenticate
  let supabase: Awaited<ReturnType<typeof createClient>>
  try {
    supabase = await createClient()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to initialize database client.'
    return { success: false, error: message }
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) {
    return { success: false, error: `Authentication failed: ${authError.message}` }
  }
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    return { success: false, error: message }
  }

  return { success: true }
}
