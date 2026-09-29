// ============================================================
// COLORIDO 2K26 — REGISTRATIONS SERVICE
// Public write path: anyone can INSERT a registration (RLS
// allows it), but nobody can read/update/delete from the
// browser — only from the Supabase dashboard with the service
// role. See supabase/migrations for the RLS policies.
// ============================================================

import { getClient } from './base.js';

// Postgres error codes we want to turn into friendly messages.
const UNIQUE_VIOLATION = '23505';
const CHECK_VIOLATION = '23514';

export async function createRegistration(payload) {
  const { error } = await getClient().from('registrations').insert({
    full_name: payload.fullName,
    college_name: payload.collegeName,
    email: payload.email,
    phone: payload.phone,
    gender: payload.gender || null,
    event_id: payload.eventId,
    participant_type: payload.participantType || null,
    team_name: payload.teamName || null,
    participant_count: payload.participantCount ? Number(payload.participantCount) : null,
    team_members: payload.teamMembers?.length ? payload.teamMembers : null,
  });

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      throw new Error('You have already registered for this event with this email address.');
    }
    if (error.code === CHECK_VIOLATION) {
      throw new Error('Some of the details you entered are invalid. Please double-check the form.');
    }
    throw new Error(`Registration failed: ${error.message}`);
  }
}
