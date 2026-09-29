# Migrations

Supabase is used for exactly one thing here: collecting registrations
submitted through the form on `register.html`. Everything else
(events, schedule, announcements, results, sponsors, gallery) is
static data in `data/*.js` and does not touch the database.

Run these in order:

1. `20260929000002_create_registrations_table.sql` — schema for `registrations`, the table the public registration form writes to. Enables RLS with a public **insert-only** policy — nobody can read/update/delete it from the browser.
2. `20260929000003_drop_content_tables.sql` — cleanup only needed if you previously ran an older version of this project's migrations that created `events`, `schedule_days`, `schedule_items`, `announcements`, `results`, `sponsors` and `gallery_images` tables. Drops them, since that content is static again. Safe to run even if those tables don't exist.
3. `20260929000004_add_team_members_to_registrations.sql` — only needed if your `registrations` table was created before `team_members` was added to migration 1 above. Adds the column. Safe to run even if it already exists.

## How to run them

Easiest: open your project's **SQL Editor** in the Supabase dashboard and paste/run each file's contents in order.

Or, if you use the [Supabase CLI](https://supabase.com/docs/guides/cli) and have it linked to this project:

```bash
supabase db push
```

## Viewing registrations

There is no admin UI in this app. View/export submitted registrations from the Supabase dashboard's **Table Editor** (or SQL Editor) on the `registrations` table — the public site can't read them back (by design — see the RLS policy comment in the migration).
