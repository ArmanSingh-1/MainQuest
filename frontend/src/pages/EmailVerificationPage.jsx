import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Mail, RefreshCw, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export default function EmailVerificationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState('')

  // Email saved in location state by RegisterPage
  const email = location.state?.email || ''

  useEffect(() => {
    // If already verified and signed in, go to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard', { replace: true })
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) navigate('/dashboard', { replace: true })
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  const handleResend = async () => {
    if (!email) { setResendError('Email not found. Please register again.'); return }
    setResendLoading(true); setResendError(''); setResendSuccess(false)
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email })
      if (error) throw error
      setResendSuccess(true)
    } catch (e) {
      setResendError(e.message || 'Failed to resend.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-shell-bg" />
      <div className="auth-shell-overlay" />

      <div className="auth-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="auth-header" style={{ marginBottom: 28 }}>
          <div className="arka-logo">
            <img src="/logo.png" alt="ARKA" className="arka-logo-img" />
          </div>
        </div>

        <div className="auth-card" style={{ textAlign: 'center', gap: 0, padding: 36 }}>
          {/* Icon */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Mail size={32} color="#f97316" />
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Check your inbox
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 28 }}>
            We sent a verification link to
            {email && <><br /><strong style={{ color: '#f1f5f9' }}>{email}</strong></>}
            <br />Click it to activate your ARKA account.
          </p>

          {/* Steps */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', padding: 16, marginBottom: 24, textAlign: 'left' }}>
            {['Open the email from ARKA in your inbox', 'Click "Confirm your email" in the email', 'You\'ll be signed in and redirected automatically'].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#f97316' }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{step}</span>
              </div>
            ))}
          </div>

          {resendSuccess && (
            <div className="alert alert-success" style={{ marginBottom: 16, textAlign: 'left' }}>
              <CheckCircle2 size={14} /><span>Resent! Check your inbox.</span>
            </div>
          )}
          {resendError && (
            <div className="alert alert-error" style={{ marginBottom: 16, textAlign: 'left' }}>
              <AlertCircle size={14} /><span>{resendError}</span>
            </div>
          )}

          <button onClick={handleResend} className="btn-ghost" disabled={resendLoading} style={{ marginBottom: 20 }}>
            {resendLoading ? <><span className="btn-spinner" /> Sending...</> : <><RefreshCw size={14} /> Resend verification email</>}
          </button>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            Already verified?{' '}
            <Link to="/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 500 }}>
              Sign in <ArrowRight size={12} style={{ display: 'inline' }} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
