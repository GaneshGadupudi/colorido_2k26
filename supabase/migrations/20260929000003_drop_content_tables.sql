-- ============================================================
-- COLORIDO 2K26 — Drop content tables
--
-- The site only needs Supabase to collect registrations.
-- Events, schedule, announcements, results, sponsors and
-- gallery images all moved back to being static data in
-- data/*.js, so the tables that used to hold them (created by
-- the old 20260929000001_create_content_tables.sql migration)
-- are no longer needed.
--
-- `cascade` also drops the now-obsolete foreign key from
-- registrations.event_id -> events.id, if it exists — event_id
-- is a plain text column now (see 20260929000002).
-- ============================================================

drop table if exists schedule_items cascade;
drop table if exists schedule_days cascade;
drop table if exists announcements cascade;
drop table if exists results cascade;
drop table if exists sponsors cascade;
drop table if exists gallery_images cascade;
drop table if exists events cascade;

drop function if exists set_updated_at cascade;
