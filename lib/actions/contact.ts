'use server'

import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['general', 'support', 'feedback', 'collaboration']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export async function submitContactAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // Step 1: Validate
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    const fieldError = parsed.error.errors[0]?.message ?? 'Invalid form data'
    return { success: false, error: fieldError }
  }

  // Step 2: Act
  try {
    // TODO: implement actual contact submission (e.g., send email, insert to DB)
    // const supabase = await createClient()
    // const { error } = await supabase.from('contact_submissions').insert(parsed.data)
    // if (error) throw error
  } catch (error) {
    console.error('[submitContactAction]', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
