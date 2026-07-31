import { createClient } from '@supabase/supabase-js';

// Showcase's own Supabase (profiles, partner requests)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// PM Platform Supabase (read-only project/task data)
export const pmSupabase = createClient(
  process.env.NEXT_PUBLIC_PM_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_PM_SUPABASE_ANON_KEY!
);

export const COMMS_URL = process.env.NEXT_PUBLIC_COMMS_URL || 'https://cohort-comms-rho.vercel.app';
export const PM_URL = process.env.NEXT_PUBLIC_PM_URL || 'https://pm-artira-azure.vercel.app';
