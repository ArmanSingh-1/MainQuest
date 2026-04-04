import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────────────────────
// Supabase credentials (from .env)
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
export const API_URL = import.meta.env.VITE_API_URL || 'https://arka-backend-8bgc.onrender.com'
export const FRONTEND_URL = 'https://arka-5m1l.onrender.com'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// DEMO MODE — bypasses all Supabase auth so no emails are sent.
// Set VITE_DEMO_MODE=true in .env to enable.
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

/**
 * In demo mode, store the full profile locally and mark the user as
 * "signed in" without touching Supabase auth at all.
 * Returns { data, error } shape identical to supabase.auth.signUp().
 */
export function mockDemoSignup(formData) {
  const fakeUserId = 'demo-' + Math.random().toString(36).slice(2)
  const demoUser = {
    id: fakeUserId,
    email: formData.email,
    full_name: formData.full_name,
    phone: formData.phone,
    city: formData.city,
    delivery_zone: formData.delivery_zone,
    platform: formData.platform,
    avg_weekly_income: formData.avg_weekly_income,
    avg_weekly_hours: formData.avg_weekly_hours,
    upi_id: formData.upi_id,
    onboarding_complete: true,
    created_at: new Date().toISOString(),
  }
  // Persist demo user so dashboard can read it
  localStorage.setItem('arka_demo_user', 'true')
  localStorage.setItem('arka_demo_profile', JSON.stringify(demoUser))
  return { data: { user: { id: fakeUserId } }, error: null }
}
