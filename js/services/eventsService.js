// ============================================================
// COLORIDO 2K26 — EVENTS SERVICE
// ============================================================

import { getClient } from './base.js';

const COLUMNS =
  'id, name, category, division, icon, tagline, description, venue, ' +
  'date:event_date, time:event_time, team_size, fee, rules, schedule, sort_order';

export async function fetchEvents() {
  const { data, error } = await getClient()
    .from('events')
    .select(COLUMNS)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Could not load events: ${error.message}`);
  return data ?? [];
}

export async function fetchEventById(id) {
  const { data, error } = await getClient()
    .from('events')
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`Could not load event: ${error.message}`);
  return data;
}
