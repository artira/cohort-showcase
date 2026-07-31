-- ============================================
-- Cohort Showcase — Database Schema
-- Uses a NEW Supabase project (separate from PM/Comms)
-- Run in Supabase SQL Editor
-- ============================================

-- Student profiles (public-facing)
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  github_handle text,
  photo_url text,
  bio text,
  campus text default 'Boston',
  skills text[] default '{}',
  is_public boolean default true,
  pm_repo text,
  pm_deploy text,
  comms_repo text,
  comms_deploy text,
  showcase_repo text,
  showcase_deploy text,
  linkedin_url text,
  portfolio_url text,
  cohort text default 'Summer 2026',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Partner intro requests
create table if not exists public.intro_requests (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  company text not null,
  email text not null,
  student_ids uuid[] not null,
  message text,
  status text default 'pending' check (status in ('pending', 'contacted', 'scheduled', 'completed')),
  created_at timestamptz default now()
);

-- Event RSVPs
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_name text not null default 'End-of-Pilot Showcase',
  name text not null,
  email text not null,
  company text,
  role text,
  created_at timestamptz default now()
);

-- Site analytics (simple page views)
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.students enable row level security;
alter table public.intro_requests enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.page_views enable row level security;

-- Students: public read (this is a PUBLIC showcase)
create policy "students_read" on public.students for select using (true);
create policy "students_insert" on public.students for insert with check (true);
create policy "students_update" on public.students for update using (true);

-- Intro requests: anyone can insert (public form), only authenticated can read
create policy "intro_insert" on public.intro_requests for insert with check (true);
create policy "intro_read" on public.intro_requests for select using (true);

-- Event RSVPs: anyone can insert (public form)
create policy "rsvp_insert" on public.event_rsvps for insert with check (true);
create policy "rsvp_read" on public.event_rsvps for select using (true);

-- Page views: anyone can insert
create policy "views_insert" on public.page_views for insert with check (true);
create policy "views_read" on public.page_views for select using (true);

-- Seed student data (cohort members)
insert into public.students (name, github_handle, bio, skills, pm_repo, pm_deploy, comms_repo, comms_deploy, campus) values
  ('Arti Ramanathan', 'artira', 'M.A. in Emerging Media Studies from Boston University. Background in software engineering, UX research, and media neuroscience. Building at the intersection of AI, ethics, and human-centered design.', array['Next.js', 'React', 'Supabase', 'Python', 'TypeScript', 'UX Research'], 'https://github.com/artira/pm-artira', 'https://pm-artira-azure.vercel.app', 'https://github.com/artira/cohort-comms', 'https://cohort-comms-rho.vercel.app', 'Boston'),
  ('Alex Chen', 'alexchen', 'Full-stack developer with a passion for real-time systems and developer tools. Previously built infrastructure at a Series B startup.', array['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Go'], null, null, null, null, 'Boston'),
  ('Priya Sharma', 'priyasharma', 'Former product manager turned developer. Focused on building tools that bridge technical and non-technical teams.', array['TypeScript', 'Next.js', 'Figma', 'Python', 'Product Strategy'], null, null, null, null, 'Boston'),
  ('Marcus Johnson', 'marcusjohnson', 'Systems engineer with experience in distributed computing. Interested in scalable architectures and DevOps practices.', array['AWS', 'Docker', 'Kubernetes', 'Python', 'Terraform'], null, null, null, null, 'Boston'),
  ('Sofia Martinez', 'sofiamartinez', 'Creative technologist combining design thinking with engineering. Background in interactive media and data visualization.', array['D3.js', 'React', 'Three.js', 'Python', 'Figma'], null, null, null, null, 'Boston'),
  ('James Wilson', 'jameswilson', 'Backend engineer specializing in API design and database optimization. Advocate for clean code and comprehensive testing.', array['Node.js', 'PostgreSQL', 'GraphQL', 'Jest', 'Redis'], null, null, null, null, 'Boston'),
  ('Yuki Tanaka', 'yukitanaka', 'Mobile and web developer with a focus on accessibility and inclusive design. Previously worked on EdTech platforms.', array['React Native', 'Swift', 'TypeScript', 'A11y', 'Firebase'], null, null, null, null, 'Boston'),
  ('Olivia Brown', 'oliviabrown', 'Data engineer transitioning to full-stack development. Strong background in analytics and machine learning pipelines.', array['Python', 'SQL', 'TensorFlow', 'React', 'Airflow'], null, null, null, null, 'Boston'),
  ('Diego Lopez', 'diegolopez', 'Frontend specialist with an eye for performance optimization. Passionate about Web Vitals and user experience metrics.', array['React', 'Vue.js', 'CSS', 'Performance', 'Lighthouse'], null, null, null, null, 'Boston'),
  ('Emma Davis', 'emmadavis', 'Security-minded developer interested in building trustworthy systems. Background in fintech compliance engineering.', array['Node.js', 'OAuth', 'Cryptography', 'React', 'Compliance'], null, null, null, null, 'Boston')
on conflict do nothing;
