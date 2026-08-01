import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;
let _pmSupabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Showcase Supabase not configured');
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export function getPmSupabase(): SupabaseClient {
  if (!_pmSupabase) {
    const url = process.env.NEXT_PUBLIC_PM_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_PM_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('PM Supabase not configured');
    _pmSupabase = createClient(url, key);
  }
  return _pmSupabase;
}

export const COMMS_URL = process.env.NEXT_PUBLIC_COMMS_URL || 'https://cohort-comms-rho.vercel.app';
export const PM_URL = process.env.NEXT_PUBLIC_PM_URL || 'https://pm-artira-azure.vercel.app';
