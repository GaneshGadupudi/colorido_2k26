// ============================================================
// COLORIDO 2K26 — SPONSORS SERVICE
// ============================================================

import { getClient } from './base.js';

export async function fetchSponsors() {
  const { data, error } = await getClient()
    .from('sponsors')
    .select('id, name, tier, logo, sort_order')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Could not load sponsors: ${error.message}`);
  return data ?? [];
}
