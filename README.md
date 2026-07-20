# Leo Club of REC — Official Website

A premium, fully responsive website for the **Leo Club of Rajalakshmi Engineering College**
(Leo Club of REC) — a community service club under **Lions Clubs International, District 324 M**.

The site has a **public area** anyone can view and an **admin dashboard** where approved club
members log in to edit all content (events, members, gallery, announcements, achievements) through
forms — no code required. A **super-admin** can add or remove other admins, so access passes to
next year's team by role, not by person.

> _"We're better together."_

---

## ✨ Features

- **Public pages:** Home, About, Members, Events, Gallery, Achievements, Join Us, Contact.
- **Members** with a tenure switcher (2026‑27 / 2025‑26), grouped into Faculty, Office Bearers,
  Seniors, Board and General members.
- **Events** split into Upcoming / Past, each opening a full detail view.
- **Gallery** grouped by event with a full-screen lightbox.
- **Admin dashboard** with full CRUD + image uploads for every content type.
- **Role-based admins** (admin / super‑admin) managed from the dashboard.
- **Premium design:** metallic gold on deep navy, serif headings, gold dividers, scroll
  fade‑and‑rise animations, hover‑lift cards. Mobile‑first and fully responsive.
- **Works instantly in demo mode** with all real club content pre‑loaded — connect Supabase to
  enable login and persistent editing.

## 🧱 Tech stack

| Layer      | Choice                                                   |
| ---------- | -------------------------------------------------------- |
| Front end  | React 18 + Vite                                          |
| Routing    | React Router 6                                           |
| Styling    | Tailwind CSS (custom gold/navy theme)                    |
| Animation  | Framer Motion + IntersectionObserver reveals             |
| Backend    | **Supabase** — Auth, Postgres database, Storage (images) |
| Hosting    | Vercel or Netlify (free tier)                            |

---

## 🚀 Quick start (local)

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open the printed URL (usually http://localhost:5173). The site runs immediately in **demo mode**
with all real content — no backend needed yet. Login and saving are disabled until you connect
Supabase (below).

---

## 🗄️ Connect Supabase (enables login + persistent editing)

Everything an admin saves is stored in Supabase and shows up on the live public site immediately.

### 1. Create the project

1. Go to <https://supabase.com> → **New project**. Pick a name, a strong database password and a
   region close to Chennai (e.g. Mumbai / Singapore).
2. Wait for it to finish provisioning.

### 2. Create the database, security rules and seed content

1. In your project, open **SQL Editor → New query**.
2. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it in.
3. **Before running**, scroll to the bottom (section 6) and change the first super‑admin email to
   **your** email address.
4. Click **Run**. This creates all tables, Row Level Security (public read / admin‑only write), the
   `media` storage bucket, and pre‑loads every event, member, achievement and announcement.

### 3. Get your API keys

In Supabase: **Settings → API**. Copy:

- **Project URL**
- **anon public** key

### 4. Add them to the app

Create a file named `.env` in the project root (copy `.env.example`):

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Restart `npm run dev`. The "Demo mode" banner disappears — the site now reads from your database.

### 5. Create your admin login

An admin needs **two** things: a row in the `admins` table (done in step 2 for your email) **and**
a Supabase Auth account with the same email.

1. In Supabase: **Authentication → Users → Add user → Create new user**.
2. Use the **same email** you set as super‑admin, and set a password. (Tick "Auto‑confirm" so no
   email verification is needed.)
3. Go to your site's **/login**, sign in with that email + password.
4. You're in the dashboard as a super‑admin. From here you can **add more admins** by email under
   the **Admins** tab — invite each new person as an Auth user the same way, and they can log in.

> **How admin access works:** admins are matched by **email**. To hand the club over to next
> year's team, a super‑admin just adds their emails (and invites them as Auth users) and removes
> the outgoing ones — no code changes.

---

## 🖼️ Adding your logos & photos

The three logos currently render as tasteful gold SVG placeholders. To use the real artwork:

1. Drop the files into the [`public/`](./public) folder, e.g. `logo-crest.png`, `logo-lions.png`,
   `logo-rec.png`.
2. Open [`src/components/Logos.jsx`](./src/components/Logos.jsx) and set the paths at the top:
   ```js
   const REAL = {
     crest: '/logo-crest.png',
     lions: '/logo-lions.png',
     college: '/logo-rec.png',
   }
   ```

**Member photos, event posters and gallery images** are uploaded directly from the admin dashboard
(they go to Supabase Storage) — no code needed. Until then, clean placeholders are shown.

To add your **LinkedIn** URL, set `linkedin` in [`src/data/seed.js`](./src/data/seed.js) (and/or in
the `CLUB` info).

---

## ☁️ Deploy for free

### Option A — Vercel

1. Push this repo to GitHub.
2. Go to <https://vercel.com> → **Add New → Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist` (auto‑detected).
4. Add **Environment Variables**: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. **Deploy.** A `vercel.json` is included so client‑side routes (e.g. `/members`) work on refresh.

### Option B — Netlify

1. Push to GitHub → <https://app.netlify.com> → **Add new site → Import**.
2. Build command `npm run build`, publish directory `dist`.
3. Add the two `VITE_` environment variables under **Site settings → Environment variables**.
4. **Deploy.** A `netlify.toml` with SPA redirects is included.

> After deploying, add your production URL to Supabase under **Authentication → URL Configuration →
> Site URL / Redirect URLs** so login works on the live domain.

---

## 🗂️ Project structure

```
├── index.html
├── supabase/schema.sql        # DB tables, RLS, storage, seed data — run once
├── public/                    # favicon + (your) logo files
└── src/
    ├── data/seed.js           # all real club content (also used as demo fallback)
    ├── lib/                   # supabase client, image upload, helpers
    ├── context/AuthContext    # login + admin/super-admin state
    ├── hooks/useContent       # loads DB (or seed) + create/update/delete
    ├── components/            # navbar, footer, cards, modal, lightbox, logos
    │   └── admin/             # reusable CRUD manager + admins manager
    └── pages/                 # public pages + /login + /admin dashboard
```

## 🔐 Data model (tables)

`tenures`, `members`, `events`, `gallery`, `announcements`, `achievements`, `admins` — all with
**public read** and **admin‑only write** enforced by Postgres Row Level Security. Image uploads go
to the public `media` storage bucket (admin‑only write). See `supabase/schema.sql` for the full
definitions.

---

## 📇 Content you can still drop in later

Office‑bearer & board photos, the general‑member list, LinkedIn, the real logo files and event
posters. Everything is structured so you can add these from the dashboard (or the two small config
spots above) without any redesign.

---

Built with care for the Leo Club of Rajalakshmi Engineering College · District 324 M ·
_We inspire and empower to make a difference._
