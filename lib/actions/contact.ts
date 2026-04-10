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
): Promise<{ error?: string; success?: boolean }> {
  // Step 1: Authenticate
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Step 2: Validate
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    const fieldError = parsed.error.errors[0]?.message ?? 'Invalid form data'
    return { error: fieldError }
  }

  // Step 3: Act
  try {
    // TODO: implement actual contact submission (e.g., send email, insert to DB)
    // const { error } = await supabase.from('contact_submissions').insert({ ...parsed.data, user_id: user.id })
    // if (error) throw error
  } catch (error) {
    console.error('[submitContactAction]', error)
    return { error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
