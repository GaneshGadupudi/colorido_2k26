# Migrations

Run these in order — each one depends on the previous:

1. `20260929000001_create_content_tables.sql` — schema for `events`, `schedule_days`, `schedule_items`, `announcements`, `results`, `sponsors`, `gallery_images`. Enables RLS with public (anon + authenticated) **read-only** policies on all of them.
2. `20260929000002_create_registrations_table.sql` — schema for `registrations`, the table the public registration form writes to. Enables RLS with a public **insert-only** policy — nobody can read/update/delete it from the browser.
3. `20260929000003_seed_content_data.sql` — populates the content tables with the festival's actual events/schedule/announcements/results/sponsors/gallery data (the same data that used to live in `data/*.js`). Safe to re-run; it clears each table before inserting.

## How to run them

Easiest: open your project's **SQL Editor** in the Supabase dashboard and paste/run each file's contents in order.

Or, if you use the [Supabase CLI](https://supabase.com/docs/guides/cli) and have it linked to this project:

```bash
supabase db push
```

## Managing content afterwards

There is no admin UI in this app. Add/edit/remove events, schedule items, announcements, results, sponsors and gallery images directly from the Supabase dashboard's **Table Editor** (or SQL Editor) — that connection bypasses RLS, so it can write even though the public site can only read.

Registrations submitted through the site land in the `registrations` table; view/export them the same way (Table Editor), since the public site cannot read them back (by design — see the RLS policy comments in migration 2).
