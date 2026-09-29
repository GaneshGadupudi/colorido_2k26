-- ============================================================
-- COLORIDO 2K26 — Content tables
-- events, schedule_days, schedule_items, announcements,
-- results, sponsors, gallery_images.
--
-- These hold the festival's public content (everything the
-- static data/*.js files used to hard-code). They are readable
-- by anyone (anon + authenticated) via RLS, but not writable
-- from the browser — content is managed from the Supabase
-- dashboard (Table Editor / SQL editor) using the service role,
-- which bypasses RLS. See 20260929000003_seed_content_data.sql
-- for the initial data.
-- ============================================================

-- ── updated_at trigger helper ──────────────────────────────
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── events ──────────────────────────────────────────────────
create table if not exists events (
  id           text primary key,
  name         text not null,
  category     text not null check (category in ('Cultural', 'Sports')),
  division     text not null,
  icon         text not null,
  tagline      text not null,
  description  text not null,
  venue        text not null,
  event_date   text not null,
  event_time   text not null,
  team_size    text not null,
  fee          text not null,
  rules        jsonb not null default '[]'::jsonb,
  schedule     jsonb not null default '[]'::jsonb,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_events_category on events (category);
create index if not exists idx_events_sort_order on events (sort_order);

create trigger events_set_updated_at
  before update on events
  for each row execute function set_updated_at();

alter table events enable row level security;

create policy "Public read access on events"
  on events for select
  to anon, authenticated
  using (true);

-- ── schedule_days ───────────────────────────────────────────
create table if not exists schedule_days (
  id          text primary key,
  label       text not null,
  event_date  text not null,
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create trigger schedule_days_set_updated_at
  before update on schedule_days
  for each row execute function set_updated_at();

alter table schedule_days enable row level security;

create policy "Public read access on schedule_days"
  on schedule_days for select
  to anon, authenticated
  using (true);

-- ── schedule_items ──────────────────────────────────────────
create table if not exists schedule_items (
  id          uuid primary key default gen_random_uuid(),
  day_id      text not null references schedule_days (id) on delete cascade,
  time        text not null,
  activity    text not null,
  venue       text not null,
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists idx_schedule_items_day_id on schedule_items (day_id);
create index if not exists idx_schedule_items_sort_order on schedule_items (sort_order);

create trigger schedule_items_set_updated_at
  before update on schedule_items
  for each row execute function set_updated_at();

alter table schedule_items enable row level security;

create policy "Public read access on schedule_items"
  on schedule_items for select
  to anon, authenticated
  using (true);

-- ── announcements ───────────────────────────────────────────
create table if not exists announcements (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  announced_date  text not null,
  description     text not null,
  badge           text not null check (badge in ('New', 'Info', 'Urgent')),
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_announcements_sort_order on announcements (sort_order);

create trigger announcements_set_updated_at
  before update on announcements
  for each row execute function set_updated_at();

alter table announcements enable row level security;

create policy "Public read access on announcements"
  on announcements for select
  to anon, authenticated
  using (true);

-- ── results ─────────────────────────────────────────────────
create table if not exists results (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('cultural', 'sports')),
  event_name  text not null,
  winner      text not null,
  runner_up   text not null,
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists idx_results_category on results (category);
create index if not exists idx_results_sort_order on results (sort_order);

create trigger results_set_updated_at
  before update on results
  for each row execute function set_updated_at();

alter table results enable row level security;

create policy "Public read access on results"
  on results for select
  to anon, authenticated
  using (true);

-- ── sponsors ────────────────────────────────────────────────
create table if not exists sponsors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  tier        text not null,
  logo        text not null,
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists idx_sponsors_sort_order on sponsors (sort_order);

create trigger sponsors_set_updated_at
  before update on sponsors
  for each row execute function set_updated_at();

alter table sponsors enable row level security;

create policy "Public read access on sponsors"
  on sponsors for select
  to anon, authenticated
  using (true);

-- ── gallery_images ──────────────────────────────────────────
create table if not exists gallery_images (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  alt         text not null,
  size        text not null check (size in ('large', 'medium', 'small')),
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists idx_gallery_images_sort_order on gallery_images (sort_order);

create trigger gallery_images_set_updated_at
  before update on gallery_images
  for each row execute function set_updated_at();

alter table gallery_images enable row level security;

create policy "Public read access on gallery_images"
  on gallery_images for select
  to anon, authenticated
  using (true);
