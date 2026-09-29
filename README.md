# colorido_2k26

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-94szbega)

## Backend (Supabase)

This site is backed by [Supabase](https://supabase.com) for content (events, schedule, announcements, results, sponsors, gallery) and for storing event registrations.

### 1. Set up the database

In your Supabase project, run the SQL files under `supabase/migrations/` in order — see `supabase/migrations/README.md` for details and options (dashboard SQL Editor or `supabase db push`).

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's **Settings → API** page. `.env.local` is git-ignored — never commit real credentials.

### 3. Install and run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```
