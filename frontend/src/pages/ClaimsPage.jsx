import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  Shield, CheckCircle2, Clock, XCircle, Activity,
  ChevronRight, FileText, LogOut, LayoutDashboard,
  MapPin, CloudRain, Thermometer, Wind, AlertTriangle
} from 'lucide-react'

const STATUS_META = {
  auto_approved: { label: 'Auto-Approved', color: '#22c55e', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)',  Icon: CheckCircle2 },
  paid_out:      { label: 'Paid Out',      color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', Icon: CheckCircle2 },
  under_review:  { label: 'Under Review',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', Icon: Clock        },
  processing:    { label: 'Processing',    color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',border: 'rgba(167,139,250,0.2)',Icon: Activity      },
  rejected:      { label: 'Rejected',      color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',  Icon: XCircle      },
}

const TRIGGER_META = {
  heavy_rainfall:   { label: 'Heavy Rainfall',    color: '#60a5fa', Icon: CloudRain   },
  extreme_heat:     { label: 'Extreme Heat',       color: '#f59e0b', Icon: Thermometer },
  severe_aqi:       { label: 'Severe Air Quality', color: '#a78bfa', Icon: Wind        },
  traffic_lockdown: { label: 'Traffic Lockdown',   color: '#ef4444', Icon: AlertTriangle },
  flood:            { label: 'Flood/Waterlogging', color: '#22c55e', Icon: CloudRain   },
}

const MOCK_CLAIMS = [
  {
    id: 'mock-1', trigger_type: 'heavy_rainfall', zone: 'Waghodia',
    disruption_level: 'Red', payout_amount: 1900, premium_at_claim: 95,
    status: 'paid_out', fraud_score: 12,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    paid_at: new Date(Date.now() - 7 * 86400000 + 3.7 * 3600000).toISOString(),
    notes: 'Rainfall exceeded 62mm/hr in Waghodia zone. Trigger threshold: 15mm in 3 hours.',
    is_mock: true,
  },
  {
    id: 'mock-2', trigger_type: 'severe_aqi', zone: 'Sayajigunj',
    disruption_level: 'Orange', payout_amount: 950, premium_at_claim: 95,
    status: 'auto_approved', fraud_score: 8,
    created_at: new Date(Date.now() - 21 * 86400000).toISOString(),
    paid_at: new Date(Date.now() - 21 * 86400000 + 2.1 * 3600000).toISOString(),
    notes: 'AQI index of 341 sustained for 4 continuous hours in Sayajigunj zone.',
    is_mock: true,
  },
]

function AppNav({ profile }) {
  const navigate = useNavigate()
  const location = useLocation()
  const path     = location.pathname
  return (
    <nav className="app-nav">
      <img src="/logo.png" alt="ARKA" className="app-nav-logo" />
      <div className="app-nav-links">
        {[
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/claims',    icon: FileText,         label: 'Claims'    },
          { to: '/policy',    icon: Shield,           label: 'Policy'    },
        ].map(({ to, icon: Icon, label }) => (
          <button key={to} className={`app-nav-link ${path === to ? 'app-nav-active' : ''}`} onClick={() => navigate(to)}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>
      <div className="app-nav-right">
        {profile?.city && <span className="app-nav-chip"><MapPin size={10} /> {profile.city}</span>}
        <button className="app-nav-signout" onClick={() => supabase.auth.signOut()}><LogOut size={14} /> Sign Out</button>
      </div>
    </nav>
  )
}

function ClaimCard({ claim, onAppeal }) {
  const [expanded, setExpanded] = useState(false)
  const trig   = TRIGGER_META[claim.trigger_type] || { label: claim.trigger_type, color: '#f59e0b', Icon: AlertTriangle }
  const status = STATUS_META[claim.status] || STATUS_META.under_review
  const { Icon: StatusIcon } = status
  const { Icon: TrigIcon }   = trig

  const timeAgo = (iso) => {
    const d = Math.floor((Date.now() - new Date(iso)) / 86400000)
    if (d === 0) return 'Today'
    if (d === 1) return 'Yesterday'
    return `${d}d ago`
  }

  return (
    <div className={`claim-card ${expanded ? 'claim-card-open' : ''}`}>
      {claim.is_mock && (
        <div className="claim-demo-strip">Illustrative demo claim — actual claims appear automatically when a trigger fires</div>
      )}
      <div className="claim-card-main" onClick={() => setExpanded(e => !e)}>

        <div className="claim-trig-icon" style={{ background: trig.color + '12', border: `1px solid ${trig.color}25` }}>
          <TrigIcon size={18} color={trig.color} />
        </div>

        <div className="claim-info">
          <div className="claim-name">{trig.label}</div>
          <div className="claim-meta">
            <span>{claim.zone}</span>
            <span className="claim-meta-sep">·</span>
            <span>{timeAgo(claim.created_at)}</span>
            <span className="claim-meta-sep">·</span>
            <span className={`claim-dl ${claim.disruption_level === 'Red' ? 'dl-red' : 'dl-amber'}`}>
              {claim.disruption_level} disruption
            </span>
          </div>
        </div>

        <div className="claim-payout">
          <div className="claim-payout-amount">
            {claim.payout_amount > 0 ? `₹${claim.payout_amount.toLocaleString('en-IN')}` : '—'}
          </div>
          <div className="claim-payout-label">{claim.status === 'rejected' ? 'no payout' : 'payout'}</div>
        </div>

        <div className="claim-status-badge" style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.color }}>
          <StatusIcon size={11} /> {status.label}
        </div>

        <ChevronRight size={15} className={`claim-chevron ${expanded ? 'rotated' : ''}`} color="rgba(255,255,255,0.25)" />
      </div>

      {expanded && (
        <div className="claim-detail">
          <div className="claim-detail-grid">
            {[
              ['Claim reference', claim.id.slice(0, 8).toUpperCase()],
              ['Trigger type',    trig.label],
              ['Zone',            claim.zone],
              ['Disruption level',`${claim.disruption_level} — ${claim.disruption_level === 'Red' ? '100%' : '50%'} payout rate`],
              ['Fraud score',     claim.fraud_score != null ? `${claim.fraud_score}/100 — ${claim.fraud_score < 35 ? 'Low risk' : claim.fraud_score < 65 ? 'Medium' : 'High risk'}` : 'N/A'],
              ['Premium at filing',claim.premium_at_claim ? `₹${claim.premium_at_claim}` : '—'],
              ['Original payout',   claim.payout_amount > 0 ? `₹${claim.payout_amount.toLocaleString('en-IN')}` : 'None'],
              ['Weekly UPI autopay deduction', `₹${Math.round(claim.payout_amount * 0.2).toLocaleString('en-IN')} (20% placeholder)`],
              ['Final payout amount', claim.payout_amount > 0 ? `₹${Math.round(claim.payout_amount * 0.8).toLocaleString('en-IN')}` : 'None'],
              ['Filed at',        new Date(claim.created_at).toLocaleString('en-IN')],
              ...(claim.paid_at ? [['Paid at', new Date(claim.paid_at).toLocaleString('en-IN')]] : []),
            ].map(([l, v]) => (
              <div key={l} className="claim-detail-row">
                <span className="claim-detail-l">{l}</span>
                <span className="claim-detail-v">{v}</span>
              </div>
            ))}
          </div>

          {claim.notes && (
            <div className="claim-notes"><span className="claim-notes-l">System notes: </span>{claim.notes}</div>
          )}

          <div className="claim-upi-note" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', padding: '12px', marginTop: '12px', fontSize: '13px', color: '#f59e0b' }}>
            <strong>UPI Autopay:</strong> Weekly UPI deduction is a placeholder feature. Real UPI integration to be implemented.
          </div>

          {claim.status === 'rejected' && (
            <button className="claim-appeal-btn" onClick={() => onAppeal(claim)}>
              <FileText size={13} /> Submit Appeal
            </button>
          )}
          {claim.status === 'under_review' && (
            <div className="claim-review-note">
              Your claim is under review. Processing typically completes within 24 hours. No action required from you.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AppealModal({ claim, onClose }) {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  if (!claim) return null
  const trig = TRIGGER_META[claim.trigger_type] || { label: claim.trigger_type }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="modal-hd"><FileText size={16} color="#f59e0b" /> Appeal Claim</div>
            <p className="modal-sub">
              {trig.label} · {claim.zone}<br />
              Provide additional context or supporting information for this claim.
            </p>
            <textarea
              className="modal-textarea" rows={5}
              placeholder="Describe why you believe this claim should be reconsidered. Include any relevant observations about zone conditions, platform activity, or other supporting details."
              value={text} onChange={e => setText(e.target.value)}
            />
            <div className="modal-actions">
              <button className="modal-cancel" onClick={onClose}>Cancel</button>
              <button className="modal-submit" onClick={() => text.trim().length > 10 && setSent(true)} disabled={text.trim().length < 10}>
                Submit Appeal
              </button>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <CheckCircle2 size={40} color="#22c55e" />
            <div className="modal-success-title">Appeal Submitted</div>
            <p className="modal-success-sub">
              Your appeal has been received. The ARKA review team will respond within 48 hours.
            </p>
            <button className="modal-submit" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ClaimsPage() {
  const navigate          = useNavigate()
  const [claims, setClaims]       = useState([])
  const [profile, setProfile]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [appealTarget, setAppeal] = useState(null)
  const [filter, setFilter]       = useState('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(prof)
      try {
        const { data: real, error } = await supabase
          .from('claims').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
        setClaims(!error && real?.length > 0 ? real : MOCK_CLAIMS)
      } catch { setClaims(MOCK_CLAIMS) }
      setLoading(false)
    }
    load()
  }, [navigate])

  if (loading) return <div className="app-loading"><div className="loading-spinner" /></div>

  const weeksPaid  = profile?.weeks_paid ?? 0
  const eligibleAt = profile?.plan_start_date
    ? new Date(new Date(profile.plan_start_date).getTime() + 12 * 7 * 86400000)
    : null
  const filtered   = filter === 'all' ? claims : claims.filter(c => c.status === filter)
  const stats = {
    total:     claims.length,
    approved:  claims.filter(c => ['auto_approved','paid_out'].includes(c.status)).length,
    pending:   claims.filter(c => ['under_review','processing'].includes(c.status)).length,
    totalPaid: claims.reduce((s, c) => s + (c.payout_amount || 0), 0),
  }

  return (
    <div className="claims-shell">
      <AppNav profile={profile} />

      <div className="claims-body">

        {/* HEADER */}
        <div className="claims-page-hd">
          <h1 className="claims-h1">Claims History</h1>
          <p className="claims-h1-sub">
            Claims are auto-initiated by ARKA when a parametric trigger fires in your delivery zone. No action is needed from you.
          </p>
          {claims.some(c => c.is_mock) && (
            <div className="claims-demo-notice">
              Showing illustrative demo claims. Your actual claims will appear here automatically when a trigger is detected.
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="claims-stats">
          {[
            { label: 'Total Claims',       val: stats.total,    color: '#fff'    },
            { label: 'Approved or Paid',   val: stats.approved, color: '#22c55e' },
            { label: 'Under Review',       val: stats.pending,  color: '#f59e0b' },
            { label: 'Total Amount Paid',  val: `₹${stats.totalPaid.toLocaleString('en-IN')}`, color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} className="claims-stat-card">
              <div className="claims-stat-val" style={{ color: s.color }}>{s.val}</div>
              <div className="claims-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ELIGIBILITY */}
        <div className="claims-eligibility">
          <div className="claims-elig-left">
            <div className="claims-elig-title">
              {weeksPaid >= 12 ? 'Claim Eligible — 12 premium weeks completed' : `Eligibility Tracker — ${weeksPaid} / 12 weeks`}
            </div>
            <div className="claims-elig-sub">
              {weeksPaid >= 12
                ? 'You are eligible for automatic claim payouts. ARKA monitors your zone continuously.'
                : `${12 - weeksPaid} more weekly premiums required for claim eligibility.${eligibleAt ? ` Estimated eligible: ${eligibleAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}`}
            </div>
          </div>
          <div className="claims-elig-bar-wrap">
            <div className="claims-elig-bar">
              <div className="claims-elig-fill" style={{ width: `${Math.min(100, (weeksPaid / 12) * 100)}%` }} />
            </div>
            <div className="claims-elig-pct">{weeksPaid} / 12 weeks</div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="claims-filters">
          {[
            { key: 'all',           label: 'All' },
            { key: 'paid_out',      label: 'Paid Out' },
            { key: 'auto_approved', label: 'Approved' },
            { key: 'under_review',  label: 'Under Review' },
            { key: 'rejected',      label: 'Rejected' },
          ].map(f => (
            <button
              key={f.key}
              className={`claims-filter-btn ${filter === f.key ? 'filter-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key === 'all' && <span className="filter-count">{claims.length}</span>}
            </button>
          ))}
        </div>

        {/* LIST */}
        {filtered.length === 0 ? (
          <div className="claims-empty">
            <div className="claims-empty-icon-wrap">
              <Activity size={28} color="rgba(255,255,255,0.2)" />
            </div>
            <div className="claims-empty-title">
              {filter === 'all' ? 'No claims on record' : `No ${filter.replace('_', ' ')} claims`}
            </div>
            <p className="claims-empty-sub">
              {filter === 'all'
                ? 'ARKA monitors your zone every 10 minutes. When a parametric trigger fires, a claim will be auto-initiated and appear here.'
                : 'No claims match this filter.'}
            </p>
            {filter !== 'all' && (
              <button className="claims-filter-reset" onClick={() => setFilter('all')}>View all claims</button>
            )}
          </div>
        ) : (
          <div className="claims-list">
            {filtered.map(c => <ClaimCard key={c.id} claim={c} onAppeal={setAppeal} />)}
          </div>
        )}

        {/* HOW IT WORKS */}
        <div className="claims-how">
          <div className="claims-how-title">How Claims Work</div>
          <div className="claims-how-steps">
            {[
              { Icon: Activity,      step: '01', title: 'Continuous Monitoring', desc: 'Weather, AQI, and traffic data checked every 10 minutes across all registered zones.' },
              { Icon: AlertTriangle, step: '02', title: 'Threshold Detection',   desc: 'When a parametric trigger crosses its threshold, eligible partners are identified automatically.' },
              { Icon: Shield,        step: '03', title: 'Fraud Validation',       desc: '6-layer AI pipeline validates each claim in seconds — GPS, duplicates, behavioral anomalies.' },
              { Icon: CheckCircle2,  step: '04', title: 'UPI Payout',             desc: 'Validated claims are credited to your registered UPI within 4 hours. No paperwork required.' },
            ].map(({ Icon, step, title, desc }) => (
              <div key={step} className="claims-how-step">
                <div className="claims-how-step-n">{step}</div>
                <Icon size={18} className="claims-how-icon" color="rgba(255,255,255,0.4)" />
                <div className="claims-how-step-title">{title}</div>
                <div className="claims-how-step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="dash-footer-note">ARKA · Automated Risk and Claims Assistant · v1.0</p>
      </div>

      <AppealModal claim={appealTarget} onClose={() => setAppeal(null)} />
    </div>
  )
}
