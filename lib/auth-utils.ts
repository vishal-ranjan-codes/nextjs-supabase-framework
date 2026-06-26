import { createClient } from '@/lib/supabase/client'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export async function signOutAndRedirect(router: AppRouterInstance) {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
}
