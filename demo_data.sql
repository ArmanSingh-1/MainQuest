-- ============================================================
-- ARKA Demo Data SQL
-- Run this in your Supabase SQL Editor (after authentication):
--
-- IMPORTANT: These are Supabase Auth users. Because auth.users
-- is managed by Supabase Auth, you cannot insert directly.
-- Instead, use Step 0 to create auth accounts first, then run
-- Steps 1-3 with the real UUIDs from auth.users.
--
-- STEP 0: Create the two demo accounts in Supabase Dashboard →
--   Authentication → Users → Add User:
--   Email: demo.arjun@arka.in    Password: ARKAdemo@2025
--   Email: demo.priya@arka.in    Password: ARKAdemo@2025
--   Then copy the UUIDs from the Users table and replace below.
-- ============================================================

-- Replace these with real UUIDs from Authentication → Users
DO $$
DECLARE
  arjun_id UUID := '00000000-0000-0000-0000-000000000001'; -- replace with real UUID
  priya_id UUID := '00000000-0000-0000-0000-000000000002'; -- replace with real UUID
BEGIN

-- ============================================================
-- DEMO USER 1: Arjun Sharma
-- Full demo: 12 weeks paid, active policy, 2 paid claims
-- Purpose: Show judges the complete claim journey
-- ============================================================

INSERT INTO public.profiles (
  id, full_name, email, phone, city, delivery_zone, platform,
  avg_weekly_income, avg_weekly_hours, avg_weekly_deliveries,
  upi_id, onboarding_complete, policy_status,
  plan_type, plan_start_date, plan_expires_at, plan_premium_inr,
  risk_score, premium_tier, weeks_paid, created_at, updated_at
) VALUES (
  arjun_id,
  'Arjun Sharma',
  'demo.arjun@arka.in',
  '9876543210',
  'Vadodara',
  'vadodara_waghodia',
  'zepto',
  9500.00,
  52,
  130,
  'arjun.sharma@upi',
  TRUE,
  'active',
  'weekly',
  NOW() - INTERVAL '84 days',   -- started 12 weeks ago
  NOW() + INTERVAL '7 days',    -- expires next week
  95.00,
  62,
  1,
  12,
  NOW() - INTERVAL '84 days',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  full_name          = EXCLUDED.full_name,
  policy_status      = EXCLUDED.policy_status,
  plan_type          = EXCLUDED.plan_type,
  plan_start_date    = EXCLUDED.plan_start_date,
  plan_expires_at    = EXCLUDED.plan_expires_at,
  plan_premium_inr   = EXCLUDED.plan_premium_inr,
  weeks_paid         = EXCLUDED.weeks_paid,
  updated_at         = NOW();

-- ============================================================
-- DEMO USER 2: Priya Patel
-- Normal new user: 3 weeks paid, policy active, no claims
-- Purpose: Show new user onboarding state + eligibility progress
-- ============================================================

INSERT INTO public.profiles (
  id, full_name, email, phone, city, delivery_zone, platform,
  avg_weekly_income, avg_weekly_hours, avg_weekly_deliveries,
  upi_id, onboarding_complete, policy_status,
  plan_type, plan_start_date, plan_expires_at, plan_premium_inr,
  risk_score, premium_tier, weeks_paid, created_at, updated_at
) VALUES (
  priya_id,
  'Priya Patel',
  'demo.priya@arka.in',
  '9123456789',
  'Vadodara',
  'vadodara_sayajigunj',
  'blinkit',
  7200.00,
  40,
  90,
  'priya.patel@upi',
  TRUE,
  'active',
  'weekly',
  NOW() - INTERVAL '21 days',   -- started 3 weeks ago
  NOW() + INTERVAL '4 days',
  72.00,
  45,
  2,
  3,
  NOW() - INTERVAL '21 days',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  full_name          = EXCLUDED.full_name,
  policy_status      = EXCLUDED.policy_status,
  plan_type          = EXCLUDED.plan_type,
  plan_start_date    = EXCLUDED.plan_start_date,
  plan_expires_at    = EXCLUDED.plan_expires_at,
  plan_premium_inr   = EXCLUDED.plan_premium_inr,
  weeks_paid         = EXCLUDED.weeks_paid,
  updated_at         = NOW();

END $$;

-- ============================================================
-- CLAIMS for Demo User 1 (Arjun) — 3 realistic claims
-- Run this AFTER replacing arjun_id above with the real UUID
-- ============================================================

-- Ensure claims table exists first (from earlier migration)
CREATE TABLE IF NOT EXISTS public.claims (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  trigger_type     TEXT NOT NULL,
  zone             TEXT NOT NULL,
  disruption_level TEXT CHECK (disruption_level IN ('Red','Orange','Yellow')),
  payout_amount    NUMERIC(10,2) DEFAULT 0,
  premium_at_claim NUMERIC(8,2),
  status           TEXT DEFAULT 'processing'
    CHECK (status IN ('processing','under_review','auto_approved','paid_out','rejected')),
  fraud_score      INTEGER,
  notes            TEXT,
  paid_at          TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own claims"
  ON public.claims FOR SELECT
  USING (auth.uid() = user_id);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weeks_paid INTEGER DEFAULT 0;

-- Insert Arjun's claims
-- Claim 1: Paid out — Heavy Rainfall, 7 weeks ago
INSERT INTO public.claims (
  user_id, trigger_type, zone, disruption_level,
  payout_amount, premium_at_claim, status, fraud_score, notes, paid_at, created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',  -- replace with real arjun_id
  'heavy_rainfall',
  'Waghodia',
  'Red',
  1900.00,
  95.00,
  'paid_out',
  9,
  'Rainfall recorded at 67mm in 3 hours across Waghodia zone on 2025-08-14. Trigger threshold: 15mm/3hrs. All 6 fraud layers passed. Payout credited within 3h 42m.',
  NOW() - INTERVAL '49 days' + INTERVAL '4 hours',
  NOW() - INTERVAL '49 days'
);

-- Claim 2: Auto-Approved — Severe AQI, 3 weeks ago
INSERT INTO public.claims (
  user_id, trigger_type, zone, disruption_level,
  payout_amount, premium_at_claim, status, fraud_score, notes, paid_at, created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',  -- replace with real arjun_id
  'severe_aqi',
  'Waghodia',
  'Orange',
  950.00,
  95.00,
  'auto_approved',
  11,
  'AQI index sustained at 318 for 5 hours in Waghodia zone. Threshold: AQI > 300 for 3+ hours. Orange disruption level — 50% payout rate applied.',
  NOW() - INTERVAL '21 days' + INTERVAL '2 hours',
  NOW() - INTERVAL '21 days'
);

-- Claim 3: Under Review — Extreme Heat, 2 days ago
INSERT INTO public.claims (
  user_id, trigger_type, zone, disruption_level,
  payout_amount, premium_at_claim, status, fraud_score, notes, paid_at, created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',  -- replace with real arjun_id
  'extreme_heat',
  'Waghodia',
  'Orange',
  950.00,
  95.00,
  'under_review',
  22,
  'Temperature reached 44.1°C with humidity at 43% at 1:15 PM. Trigger conditions met (>43°C + humidity >40%). Fraud validation running — location cross-check pending.',
  NULL,
  NOW() - INTERVAL '2 days'
);
