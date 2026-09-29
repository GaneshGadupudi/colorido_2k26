-- ============================================================
-- COLORIDO 2K26 — Add team_members to registrations
--
-- When participant_type = 'team', the form now also collects
-- the names of the other team members (the registrant's own
-- name is already in full_name). Stored as a JSON array of
-- strings, e.g. '["Jane Doe", "John Smith"]'.
-- ============================================================

alter table registrations
  add column if not exists team_members jsonb
  check (team_members is null or jsonb_typeof(team_members) = 'array');
