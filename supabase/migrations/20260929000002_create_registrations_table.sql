-- ============================================================
-- COLORIDO 2K26 — Registrations table
--
-- The one write path the public site needs: the registration
-- form on register.html inserts a row here directly from the
-- browser using the anon key.
--
-- Security model:
--   * RLS is enabled and only an INSERT policy exists for
--     anon/authenticated — nobody can SELECT, UPDATE or DELETE
--     from the browser, protecting participants' PII.
--   * Organizers view/export registrations from the Supabase
--     dashboard (Table Editor / SQL editor), which connects
--     with a role that bypasses RLS.
--   * A unique (email, event_id) constraint stops the same
--     person from double-submitting the same event; the app
--     surfaces this as a friendly "already registered" message.
-- ============================================================

create table if not exists registrations (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null check (char_length(trim(full_name)) between 1 and 200),
  college_name        text not null check (char_length(trim(college_name)) between 1 and 200),
  email               text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone               text not null check (phone ~ '^[0-9]{10}$'),
  gender              text check (gender is null or gender in ('male', 'female', 'other')),
  event_id            text not null references events (id) on delete restrict,
  participant_type    text check (participant_type is null or participant_type in ('individual', 'team')),
  team_name           text,
  participant_count   integer check (participant_count is null or participant_count between 1 and 20),
  created_at          timestamptz not null default now(),

  unique (email, event_id)
);

create index if not exists idx_registrations_event_id on registrations (event_id);
create index if not exists idx_registrations_email on registrations (email);
create index if not exists idx_registrations_created_at on registrations (created_at);

alter table registrations enable row level security;

-- Anyone (including anonymous visitors) can submit a registration.
create policy "Public can submit registrations"
  on registrations for insert
  to anon, authenticated
  with check (true);

-- Intentionally no select/update/delete policy: the registrations
-- table is write-only from the browser. Organizers read it from
-- the Supabase dashboard with the service role.
