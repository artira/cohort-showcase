import { createClient, SupabaseClient } from '@supabase/supabase-js';

const PLACEHOLDER = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

// Showcase's own Supabase (profiles, partner requests)
export const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY
);

// PM Platform Supabase (read-only project/task data)
export const pmSupabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_PM_SUPABASE_URL || PLACEHOLDER,
  process.env.NEXT_PUBLIC_PM_SUPABASE_ANON_KEY || PLACEHOLDER_KEY
);

export const COMMS_URL = process.env.NEXT_PUBLIC_COMMS_URL || 'https://cohort-comms-rho.vercel.app';
export const PM_URL = process.env.NEXT_PUBLIC_PM_URL || 'https://pm-artira-azure.vercel.app';
