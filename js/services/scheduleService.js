// ============================================================
// COLORIDO 2K26 — SCHEDULE SERVICE
// Reshapes the schedule_days / schedule_items tables back into
// the { schedule: { day1: { label, date, items } }, scheduleDays }
// shape the schedule page already renders.
// ============================================================

import { getClient } from './base.js';

export async function fetchSchedule() {
  const client = getClient();

  const { data: days, error: daysError } = await client
    .from('schedule_days')
    .select('id, label, date:event_date, sort_order')
    .order('sort_order', { ascending: true });

  if (daysError) throw new Error(`Could not load the schedule: ${daysError.message}`);

  const { data: items, error: itemsError } = await client
    .from('schedule_items')
    .select('id, day_id, time, activity, venue, sort_order')
    .order('sort_order', { ascending: true });

  if (itemsError) throw new Error(`Could not load the schedule: ${itemsError.message}`);

  const schedule = {};
  (days ?? []).forEach((day) => {
    schedule[day.id] = {
      label: day.label,
      date: day.date,
      items: (items ?? []).filter((item) => item.day_id === day.id),
    };
  });

  return {
    schedule,
    scheduleDays: (days ?? []).map((day) => day.id),
  };
}
