// ============================================================
// COLORIDO 2K26 — SERVICE HELPERS
// Shared plumbing for the Supabase-backed data services.
// ============================================================

import { supabase, isSupabaseConfigured } from '../supabaseClient.js';

export function getClient() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Check your .env.local file.');
  }
  return supabase;
}
