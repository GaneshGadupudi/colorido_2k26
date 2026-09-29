// ============================================================
// COLORIDO 2K26 — SUPABASE CLIENT
// Single shared client, configured from Vite env vars.
// Copy .env.local.example to .env.local and fill in real values.
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    'Supabase is not configured. Copy .env.local.example to .env.local, fill in ' +
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, and restart the dev server.',
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
