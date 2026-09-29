// ============================================================
// COLORIDO 2K26 — RESULTS SERVICE
// ============================================================

import { getClient } from './base.js';

export async function fetchResults() {
  const { data, error } = await getClient()
    .from('results')
    .select('id, category, eventName:event_name, winner, runnerUp:runner_up, sort_order')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Could not load results: ${error.message}`);

  return {
    cultural: (data ?? []).filter((r) => r.category === 'cultural'),
    sports: (data ?? []).filter((r) => r.category === 'sports'),
  };
}
