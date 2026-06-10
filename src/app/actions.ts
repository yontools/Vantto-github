'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithOtp(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }
  })
  if (error) return { error: error.message, success: false }
  return { error: null, success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
