import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase, DEMO_MODE } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PolicyEnrollmentPage from './pages/PolicyEnrollmentPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import LandingPage from './pages/LandingPage'
import ClaimsPage from './pages/ClaimsPage'
import PWAInstallPrompt from './components/PWAInstallPrompt'

// After email verification, the SIGNED_IN event fires.
// We then pull the full form data saved in localStorage and update the profile.
async function completeProfileFromStorage(userId) {
  const raw = localStorage.getItem('arka_pending_profile')
  if (!raw) return
  try {
    const data = JSON.parse(raw)
    const { error } = await supabase.from('profiles').update(data).eq('id', userId)
    if (!error) {
      localStorage.removeItem('arka_pending_profile')
    }
  } catch (e) {
    console.error('Profile completion error:', e)
  }
}

export default function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // ── Always check for demo user in localStorage first ──
    // mockDemoSignup() sets 'arka_demo_user' = 'true' on both local & hosted.
    if (localStorage.getItem('arka_demo_user') === 'true') {
      const profile = JSON.parse(localStorage.getItem('arka_demo_profile') || '{}')
      setSession({ user: { id: profile.id || 'demo', email: profile.email || 'demo@arka.app' }, demo: true })
      return
    }

    // ── PRODUCTION: real Supabase session ──
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) completeProfileFromStorage(session.user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'SIGNED_IN' && session?.user) {
        completeProfileFromStorage(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <PWAInstallPrompt />
      <Routes>
        <Route path="/"             element={!session ? <LandingPage />       : <Navigate to="/dashboard" replace />} />
        <Route path="/login"        element={!session ? <LoginPage />         : <Navigate to="/dashboard" replace />} />
        <Route path="/register"     element={!session ? <RegisterPage />      : <Navigate to="/dashboard" replace />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/dashboard"    element={session   ? <DashboardPage />    : <Navigate to="/login"     replace />} />
        <Route path="/policy"       element={session   ? <PolicyEnrollmentPage /> : <Navigate to="/login" replace />} />
        <Route path="/claims"       element={session   ? <ClaimsPage />           : <Navigate to="/login" replace />} />
        <Route path="*"             element={<Navigate to={session ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
