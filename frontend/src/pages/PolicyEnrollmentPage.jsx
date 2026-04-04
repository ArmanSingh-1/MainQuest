import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  Shield, CheckCircle2, ChevronDown, ChevronUp,
  CloudRain, Thermometer, Wind, Wifi, Lock, ArrowRight, AlertCircle
} from 'lucide-react'

// ─── Plan definitions ────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'daily',
    label: 'Daily Pass',
    price: 9,
    period: '24 hours',
    periodDays: 1,
    tag: null,
    color: '#64748b',
    description: 'Perfect for occasional riders'
  },
  {
    id: 'weekly',
    label: 'Weekly Plan',
    price: 49,
    period: '7 days',
    periodDays: 7,
    tag: 'Most Popular',
    color: '#f97316',
    description: 'Best for active delivery partners'
  },
  {
    id: 'monthly',
    label: 'Monthly Plan',
    price: 149,
    period: '30 days',
    periodDays: 30,
    tag: 'Best Value',
    color: '#22c55e',
    description: 'Maximum savings & protection'
  },
]

// ─── Coverage table ───────────────────────────────────────────────────────────
const COVERAGE = [
  { icon: CloudRain,   risk: 'Heavy Rainfall',       trigger: '≥ 50 mm/hour (IMD data)', payout: '₹150/hr',  max: '6 hrs/day' },
  { icon: Thermometer, risk: 'Extreme Heat',          trigger: '≥ 40°C feels like ≥ 45°C', payout: '₹120/hr', max: '5 hrs/day' },
  { icon: Wind,        risk: 'Flood Conditions',      trigger: 'Government/IMD flood alert', payout: '₹300/day', max: '3 days' },
  { icon: Wifi,        risk: 'Platform Outage',       trigger: 'App downtime ≥ 30 minutes', payout: '₹100/hr',  max: '4 hrs/day' },
  { icon: Lock,        risk: 'Govt. Restriction',     trigger: 'Official curfew/lockdown notification', payout: '₹250/day', max: 'Policy-based' },
]

// ─── Policy sections ──────────────────────────────────────────────────────────
const POLICY_SECTIONS = [
  {
    title: '1. Policy Overview',
    content: 'ARKA (Automated Risk & Claims Assistant) is a parametric income protection insurance product designed for gig economy delivery partners in India. The policy provides fixed, pre-defined payouts when external conditions prevent insured individuals from earning income.'
  },
  {
    title: '2. Claim & Payout Mechanism (Zero-Claim Model)',
    content: 'ARKA monitors all triggers via APIs 24/7. When a trigger condition is met, the event is validated via data providers (IMD, etc.), eligible users are identified, and your payout is automatically processed avoiding manual claims. The amount gets credited within 30–120 minutes.'
  },
  {
    title: '3. Eligibility Criteria',
    content: 'Aged 18–55. Must be an active delivery partner (Swiggy, Zomato, Blinkit, Zepto, etc.) with at least 20 deliveries in the past 7 days. Must have a valid bank account/UPI ID and operate within supported geographic regions in India.'
  },
  {
    title: '4. Exclusions',
    content: 'Voluntary inactivity, personal device issues (battery, app not updated), internet connectivity issues on the user’s side, fraudulent manipulation of location/activity data, and events below threshold limits are completely excluded from payouts.'
  },
  {
    title: '5. Fraud Detection & Prevention',
    content: 'AI-based anomaly detection validates GPS, work patterns, and claim behaviour. ARKA reserves the right to reject payouts, suspend accounts, and take legal action in case of confirmed fraud.'
  },
  {
    title: '6. Cancellation, Refund & Liability',
    content: 'Cancel before activation for a full refund. No refunds after coverage begins. ARKA is only liable for predefined payouts and not for indirect/consequential losses. Subject to applicable Indian insurance laws and IRDAI frameworks.'
  },
]

export default function PolicyEnrollmentPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('weekly')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, upi_id, plan_type, policy_status, plan_premium_inr, plan_expires_at')
          .eq('id', user.id)
          .single()
        setProfile(data)
        // Pre-select existing plan if active
        if (data?.plan_type) setSelectedPlan(data.plan_type)
      }
      setPageLoading(false)
    }
    load()
  }, [navigate])

  const plan = PLANS.find(p => p.id === selectedPlan)

  const handleEnroll = async () => {
    if (!agreedToTerms) { setError('Please agree to the policy terms to continue.'); return }
    setError('')
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Session expired. Please log in again.')

      const now = new Date()
      const expires = new Date(now)
      expires.setDate(expires.getDate() + plan.periodDays)

      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({
          plan_type:           plan.id,
          plan_start_date:     now.toISOString(),
          plan_expires_at:     expires.toISOString(),
          plan_premium_inr:    plan.price,
          policy_status:       'active',
          onboarding_complete: true,
        })
        .eq('id', user.id)
        .select()

      if (updateError) {
        if (updateError.code === '42703') throw new Error('Database schema error: Policy columns missing. Run the SQL migration.')
        throw updateError
      }

      if (!updateData || updateData.length === 0) {
        throw new Error('Profile not found. Please log out and register again.')
      }

      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      setError(err.message || 'Enrollment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return <div className="app-loading"><div className="loading-spinner" /></div>
  }

  if (success) {
    return (
      <div className="app-loading">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <CheckCircle2 size={48} color="#22c55e" />
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Policy Activated!</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  const isActive = profile?.policy_status === 'active'

  return (
    <div className="auth-shell">
      <div className="auth-shell-bg" />
      <div className="auth-shell-overlay" />

      <div className="auth-content" style={{ maxWidth: 860, paddingTop: 40, paddingBottom: 60 }}>

        {/* Back */}
        <button onClick={() => navigate('/dashboard')}
          style={{ display:'flex', alignItems:'center', gap:6, background:'transparent', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.5)', fontSize:13, marginBottom:24, position:'relative', zIndex:1, padding:0 }}
        >
          ← Back to Dashboard
        </button>

        {/* Active policy banner */}
        {isActive && (
          <div style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:12, padding:'12px 18px', marginBottom:24, position:'relative', zIndex:1 }}>
            <CheckCircle2 size={16} color="#22c55e" />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#22c55e' }}>Policy Active</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:2 }}>
                {profile?.plan_type?.charAt(0).toUpperCase()}{profile?.plan_type?.slice(1)} Plan · ₹{profile?.plan_premium_inr} · Expires {profile?.plan_expires_at ? new Date(profile.plan_expires_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'}
              </div>
            </div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>Select a new plan below to change or renew</span>
          </div>
        )}

        {/* ── Header ── */}
        <header style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 100, padding: '6px 14px', marginBottom: 20 }}>
            <Shield size={14} color="#f97316" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#f97316', letterSpacing: '0.06em', textTransform: 'uppercase' }}>ARKA Parametric Income Protection Policy</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Choose Your Protection Plan
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 12, lineHeight: 1.5, maxWidth: 600, margin: '12px auto 0' }}>
            Parametric income protection — payouts triggered automatically. No manual claims needed.
          </p>
        </header>

        {/* ── Main Flex Layout (Grid for wider screens) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32, position: 'relative', zIndex: 1 }}>
          {/* ── Plan Cards ── */}
          {PLANS.map(p => {
            const active = selectedPlan === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                style={{
                  background: active ? `rgba(${p.id === 'weekly' ? '249,115,22' : p.id === 'monthly' ? '34,197,94' : '100,116,139'},0.15)` : 'rgba(13,17,30,0.6)',
                  border: `2px solid ${active ? p.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 20,
                  padding: '24px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 180
                }}
              >
                {p.tag && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: p.color, borderRadius: 100, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', boxShadow: `0 4px 12px ${p.color}40` }}>
                    {p.tag}
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, color: active ? p.color : 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 40, fontWeight: 800, color: active ? '#fff' : 'rgba(255,255,255,0.8)', lineHeight: 1, marginBottom: 8 }}>
                  <span style={{ fontSize: 24, verticalAlign: 'top', marginRight: 2, color: active ? p.color : 'rgba(255,255,255,0.5)' }}>₹</span>
                  {p.price}
                </div>
                <div style={{ fontSize: 13, color: active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>
                  per {p.period}
                </div>
                
                <div style={{ flex: 1 }} />
                
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>
                  {p.description}
                </div>
                
                {active && (
                  <div style={{ position: 'absolute', bottom: -12, background: p.color, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--bg-void)' }}>
                    <CheckCircle2 size={16} color="#fff" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Coverage Table ── */}
        <div style={{ background: 'rgba(13,17,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', marginBottom: 24, position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={18} color="rgba(255,255,255,0.7)" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>Coverage Details</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <div>Risk Type</div>
            <div>Trigger Condition</div>
            <div style={{ textAlign: 'right' }}>Payout</div>
            <div style={{ textAlign: 'right' }}>Max Limit</div>
          </div>
          {COVERAGE.map((row, i) => {
            const Icon = row.icon
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr 1fr 1fr', alignItems: 'center', padding: '16px 24px', borderBottom: i < COVERAGE.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color="#f97316" />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{row.risk}</div>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{row.trigger}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#22c55e', textAlign: 'right' }}>{row.payout}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>{row.max}</div>
              </div>
            )
          })}
        </div>

        {/* ── Policy Accordion ── */}
        <div style={{ background: 'rgba(13,17,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>Terms & Conditions</h2>
          </div>
          {POLICY_SECTIONS.map((section, i) => {
            const isOpen = expandedSection === i
            return (
              <div key={i} style={{ borderBottom: i < POLICY_SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <button
                  onClick={() => setExpandedSection(isOpen ? null : i)}
                  style={{ width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16, transition: 'background 0.2s' }}
                >
                  <span style={{ fontSize: 14, fontWeight: isOpen ? 600 : 500, color: isOpen ? '#fff' : 'rgba(255,255,255,0.8)' }}>{section.title}</span>
                  {isOpen ? <ChevronUp size={16} color="rgba(255,255,255,0.4)" /> : <ChevronDown size={16} color="rgba(255,255,255,0.4)" />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {section.content}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Summary & Terms ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24, position: 'relative', zIndex: 1 }}>
          {/* Summary Box */}
          <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 20, padding: '24px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Enrollment Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Selected Plan</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{plan.label}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Cost ({plan.period})</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#f97316' }}>₹{plan.price}</span>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Payout Via</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#22c55e' }}>
                {profile?.upi_id || 'Registered UPI ID'}
              </span>
            </div>
          </div>

          {/* Terms Box & Submit */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 16 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', background: 'rgba(13,17,30,0.4)', padding: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                onClick={() => setAgreedToTerms(v => !v)}
                style={{
                  width: 22, height: 22, borderRadius: 6, border: `2px solid ${agreedToTerms ? '#f97316' : 'rgba(255,255,255,0.2)'}`,
                  background: agreedToTerms ? 'rgba(249,115,22,0.2)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2, transition: 'all 0.15s ease', cursor: 'pointer'
                }}
              >
                {agreedToTerms && <CheckCircle2 size={14} color="#f97316" />}
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                I have read and agree to the ARKA Policy terms, coverage limits, and exclusions. I consent to automatic payouts via my registered UPI ID and acknowledge premiums are non-refundable.
              </span>
            </label>

            {error && (
              <div className="alert alert-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleEnroll}
              disabled={loading || !agreedToTerms}
              style={{ padding: '16px 24px', fontSize: 16, borderRadius: 100 }}
            >
              {loading ? (
                <><span className="btn-spinner" /> Activating Policy...</>
              ) : isActive ? (
                <>Change to {plan.label} — ₹{plan.price} <ArrowRight size={18} /></>
              ) : (
                <>Activate {plan.label} — ₹{plan.price} <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8, position: 'relative', zIndex: 1, lineHeight: 1.5 }}>
          Structured in alignment with IRDAI parametric insurance sandbox framework.<br />
        </p>

      </div>
    </div>
  )
}
