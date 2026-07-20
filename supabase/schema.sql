-- ============================================================================
--  Leo Club of REC — Supabase schema
--  Run this whole file in your Supabase project:  SQL Editor → New query → Run
--
--  It creates all tables, Row Level Security (public read / admin-only write),
--  the storage bucket for images, and pre-loads the real club content.
--  It is idempotent-ish: safe to run once on a fresh project.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- 1. TABLES
-- ─────────────────────────────────────────────────────────────

-- Admins are identified by email. A person becomes an active admin once they
-- (a) appear in this table and (b) have a Supabase Auth account with that email.
create table if not exists public.admins (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text not null default 'admin' check (role in ('admin', 'super_admin')),
  added_by   text,
  created_at timestamptz not null default now()
);

create table if not exists public.tenures (
  id         text primary key,           -- e.g. '2026-27'
  label      text not null,              -- e.g. '2026 – 27'
  is_current boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  category   text not null default 'general'
             check (category in ('office_bearer','senior','board','faculty','general')),
  tenure     text references public.tenures(id) on delete set null,
  photo_url  text,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique,
  name        text not null,
  date        date,
  end_date    date,
  venue       text,
  lead        text,
  tenure      text references public.tenures(id) on delete set null,
  description text,
  highlights  text[] default '{}',
  poster_url  text,
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  "group"    text,          -- album / event label used for grouping
  year       text,
  image_url  text not null,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  date       date,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  value       text,
  description text,
  sort_order  integer not null default 100,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- 2. HELPER FUNCTIONS (SECURITY DEFINER — bypass RLS to check membership)
-- ─────────────────────────────────────────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and a.role = 'super_admin'
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────

alter table public.tenures       enable row level security;
alter table public.members       enable row level security;
alter table public.events        enable row level security;
alter table public.gallery       enable row level security;
alter table public.announcements enable row level security;
alter table public.achievements  enable row level security;
alter table public.admins        enable row level security;

-- Public read + admin write for all CONTENT tables.
do $$
declare t text;
begin
  foreach t in array array['tenures','members','events','gallery','announcements','achievements']
  loop
    execute format('drop policy if exists "%s public read" on public.%I;', t, t);
    execute format('drop policy if exists "%s admin write" on public.%I;', t, t);
    execute format('create policy "%s public read" on public.%I for select using (true);', t, t);
    execute format(
      'create policy "%s admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin());',
      t, t);
  end loop;
end $$;

-- admins table: any admin may VIEW the list; only super-admins may modify it.
drop policy if exists "admins read"        on public.admins;
drop policy if exists "admins super write"  on public.admins;
create policy "admins read"       on public.admins for select to authenticated using (public.is_admin());
create policy "admins super write" on public.admins for all   to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- ─────────────────────────────────────────────────────────────
-- 4. STORAGE (image uploads)
-- ─────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read"  on storage.objects;
drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;

create policy "media public read"  on storage.objects for select using (bucket_id = 'media');
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 5. SEED DATA (real club content)
-- ─────────────────────────────────────────────────────────────

insert into public.tenures (id, label, is_current, sort_order) values
  ('2026-27', '2026 – 27', true,  1),
  ('2025-26', '2025 – 26', false, 2)
on conflict (id) do nothing;

-- Members ----------------------------------------------------------------
insert into public.members (name, role, category, tenure, sort_order) values
  -- 2026-27 Office Bearers
  ('Leo Aditi','President','office_bearer','2026-27',1),
  ('Leo Anvitha','Vice President','office_bearer','2026-27',2),
  ('Leo Shamruti','Secretary','office_bearer','2026-27',3),
  ('Leo Tarun','Treasurer','office_bearer','2026-27',4),
  ('Leo Christina Morenas','HR','office_bearer','2026-27',5),
  ('Leo Akash','Project Manager','office_bearer','2026-27',6),
  ('Leo Ajay','Project Secretary','office_bearer','2026-27',7),
  ('Leo Siva Prakasam','Project Secretary','office_bearer','2026-27',8),
  -- 2026-27 Seniors
  ('Sabarish Raja','Chairperson','senior','2026-27',1),
  ('Indira Yazhini MS','Senior Coordinator','senior','2026-27',2),
  ('Ragu Chanthar','Senior Coordinator','senior','2026-27',3),
  ('Haritha S','Senior Coordinator','senior','2026-27',4),
  ('Jeyashree Triloka','Senior Coordinator','senior','2026-27',5),
  -- 2026-27 Board of Directors
  ('Roshan','Event Administrator','board','2026-27',1),
  ('Chandhresh','Director of Finance','board','2026-27',2),
  ('Hisham','Director of Membership','board','2026-27',3),
  ('Harish','Club Safety Officer','board','2026-27',4),
  ('Oviya','Club Safety Officer','board','2026-27',5),
  ('Shailender','Director of Marketing','board','2026-27',6),
  ('Durgaprasad','Director of Technical','board','2026-27',7),
  ('Vigneshwar','Director of Technical','board','2026-27',8),
  ('Ashwanth','Director of Service','board','2026-27',9),
  -- Faculty (2026-27)
  ('D Gururaj','Faculty Coordinator','faculty','2026-27',1),
  ('Sushma Jagatap','Faculty Coordinator','faculty','2026-27',2),
  -- 2025-26 Office Bearers
  ('Leo Sabarish','President','office_bearer','2025-26',1),
  ('Leo Akshaya','Vice President','office_bearer','2025-26',2),
  ('Leo Indirayazhini','Secretary','office_bearer','2025-26',3),
  ('Leo Raguchanthar','Treasurer','office_bearer','2025-26',4),
  ('Leo Haritha','HR','office_bearer','2025-26',5),
  ('Leo Shaun Machado','Project Manager','office_bearer','2025-26',6),
  ('Leo Jeyashree','Project Secretary','office_bearer','2025-26',7),
  ('Leo Sriwanth','Project Secretary','office_bearer','2025-26',8),
  -- Faculty (2025-26)
  ('D Gururaj','Faculty Coordinator','faculty','2025-26',1),
  ('Sushma Jagatap','Faculty Coordinator','faculty','2025-26',2)
on conflict do nothing;

-- Events -----------------------------------------------------------------
insert into public.events (slug, name, date, end_date, venue, lead, tenure, description, highlights, featured) values
  ('leo-nova-25', 'Leo Nova ''25', '2025-09-24', null, 'REC Campus', '', '2025-26',
   'Installation of the new Leo Council 2025-26 — a ceremonial evening welcoming the incoming team and setting the vision for the year ahead.',
   array['Chief Guest: Lion Rajkumar Victor (District Chairperson)','Formal installation of the 2025-26 Council','Vision & pledge for the year of service'], false),

  ('akshar-25', 'Akshar ''25', '2025-09-28', null, 'Tambaram, Chennai', 'Tarun V', '2025-26',
   'An orphanage visit focused on learning and life-skills for children — combining civic awareness with fun, interactive sessions.',
   array['Civic sense session','Quiz for the children','Career guidance'], false),

  ('giving-grace', 'Giving Grace', '2025-10-02', null, 'Tambaram, Chennai', 'Shivani G', '2025-26',
   'A joyful day of creativity and safety awareness for children, blending craft, performance and play.',
   array['Bracelet-making workshop','Good touch / bad touch mime','Talent show for the children'], false),

  ('shrestha-25', 'Shrestha ''25 (5.0)', '2025-10-15', '2025-10-17', 'REC Campus', 'Ajay G & Shamruti S', '2025-26',
   'Our signature Diwali donation drive, in its 5th consecutive year. Donation stalls across campus collected everyday essentials that were then given to orphanages — turning the festival of lights into a festival of giving.',
   array['5th consecutive edition (SHRESTHA 5.0)','Campus-wide donation stalls','Essentials collected & distributed to orphanages','A three-day Diwali celebration of service'], true),

  ('karunya', 'Karunya', '2025-10-19', null, 'Shree Sharadha Sakthi Peetam', 'Ajay G & Shamruti S', '2025-26',
   'An orphanage outreach tied to Shrestha — carrying the collected donations to the children alongside a day of stories, craft and games.',
   array['Distribution of essentials','Storytelling','Bracelet making','Games'], false),

  ('aaharam', 'Aaharam', '2025-12-20', null, 'Marina Beach, Chennai', 'Nainika', '2025-26',
   'A food donation drive serving fresh, warm meals to the workers who keep Marina Beach running.',
   array['Fresh meals prepared & served','Support for beach workers'], false),

  ('umanita', 'Umanita', '2026-01-04', null, 'Megha Foundation (Saranalaya), Kovur', 'Divya Lakshmi D', '2025-26',
   'A caring visit combining practical health awareness with plenty of play for the children.',
   array['First-aid demonstration','Stationery & biscuits donated','Games & hand-painting'], false),

  ('empathia', 'Empathia', '2026-01-18', null, 'Online', 'Saran DP', '2025-26',
   'A virtual session building awareness and empathy around disability, made engaging with an interactive puzzle game.',
   array['Disability awareness session','Interactive puzzle game'], false),

  ('golden-chapters', 'Golden Chapters', '2026-02-01', null, 'Nanganallur, Chennai', 'Aditi G S', '2025-26',
   'An afternoon of warmth at an old age home — listening, singing and capturing memories with the elders.',
   array['Stories & conversation','Games and songs','Polaroid portraits'], false),

  ('hidaya', 'Hidaya', '2026-02-08', null, 'Sri Varasithi Vinayagar Temple', 'Roshan', '2025-26',
   'A temple cleaning drive giving back to a community space of peace and worship.',
   array['Temple cleaning drive','Community service in action'], false),

  ('audacia', 'Audacia', '2026-03-08', null, 'Tower Park, Anna Nagar', '', '2025-26',
   'A Women''s Day celebration spreading encouragement to women in the community.',
   array['Affirmation cards','Chocolates for women in the community','Women''s Day special'], false),

  ('invicta', 'Invicta', '2026-03-09', null, 'REC Campus', '', '2025-26',
   'A Women''s Day appreciation for the housekeeping and sanitary staff who care for our campus every day.',
   array['Appreciation for housekeeping & sanitary staff','Cupcakes & coin purses'], false),

  ('karam', 'Karam', '2026-03-19', null, 'Big Street Masjid', 'Mohammad Hisham M F', '2025-26',
   'A Ramzan donation drive sharing food and drinks at iftar with the community.',
   array['Ramzan iftar donation','Food & drinks shared'], false),

  ('vitarana', 'Vitarana', '2026-04-13', null, 'Pondy Bazaar', 'Shamruti', '2025-26',
   'A summer service offering cool relief to the vendors and workers of a busy marketplace.',
   array['Buttermilk distribution','Caps for vendors & workers','Summer relief'], false),

  ('harmonia', 'Harmonia', '2026-04-26', null, 'Jeeva Jothi Children''s Home', 'Christina Morenas', '2025-26',
   'An orphanage visit in collaboration with the Artistry Club — a harmony of music and craft with the children.',
   array['Collaboration with the Artistry Club','Sing-along','Bookmark making'], false),

  ('ignition', 'Ignition', '2026-07-06', null, 'Padikuppam Government High School', 'Anvitha A', '2025-26',
   'A sports-focused day donating equipment and playing games with government-school students.',
   array['Sports goods donation','Games with students'], false),

  ('shrestha-6', 'Shrestha 6.0', '2026-10-20', null, 'REC Campus', '', '2026-27',
   'The 6th edition of our signature Diwali donation drive returns. Details will be announced soon — watch this space to be part of the biggest service event of the year.',
   array['6th consecutive year','Campus donation drive','Diwali of giving'], true)
on conflict (slug) do nothing;

-- Achievements -----------------------------------------------------------
insert into public.achievements (title, value, description, sort_order) values
  ('5 Years of SHRESTHA', '5.0', 'Our signature Diwali donation drive has run for five consecutive years, growing into the club''s flagship service tradition.', 1),
  ('Orphanages & Homes Reached', '8+', 'Visits and outreach across multiple orphanages, children''s homes and old age homes throughout Chennai.', 2),
  ('Communities Served', '12+', 'From beach workers and street vendors to housekeeping staff and temple communities — service across the city.', 3),
  ('Club Collaborations', 'Artistry Club', 'Joint initiatives such as Harmonia with the Artistry Club, expanding our reach and impact together.', 4)
on conflict do nothing;

-- Announcements ----------------------------------------------------------
insert into public.announcements (title, body, date, active) values
  ('Council & Board Recruitment is Open', 'We are looking for passionate students to join the Leo Club of REC. Reach out via Instagram @leoclubrec or email to be part of the pride.', '2026-07-15', true),
  ('Shrestha 6.0 — Coming this Diwali', 'Our signature donation drive returns for its 6th year. Stay tuned for dates, stalls and how you can contribute.', '2026-07-10', true)
on conflict do nothing;

-- ─────────────────────────────────────────────────────────────
-- 6. FIRST SUPER-ADMIN  (IMPORTANT)
--    Replace the email below with YOUR email, then make sure you
--    also create a matching user under Authentication → Users.
-- ─────────────────────────────────────────────────────────────
insert into public.admins (email, role, added_by) values
  ('leoclub@rajalakshmi.edu.in', 'super_admin', 'system')
on conflict (email) do nothing;
