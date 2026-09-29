// ============================================================
// COLORIDO 2K26 — ANNOUNCEMENTS SERVICE
// ============================================================

import { getClient } from './base.js';

export async function fetchAnnouncements() {
  const { data, error } = await getClient()
    .from('announcements')
    .select('id, title, date:announced_date, description, badge, sort_order')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Could not load announcements: ${error.message}`);
  return data ?? [];
}
