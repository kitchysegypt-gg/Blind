-- Helping Hand: one settings row per person, and their request history.
create table public.hh_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.hh_profiles enable row level security;

create policy "Read own profile" on public.hh_profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Create own profile" on public.hh_profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "Update own profile" on public.hh_profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create table public.hh_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type text not null check (type in ('groceries', 'medicine', 'ride', 'helper', 'location')),
  text text not null check (char_length(text) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index hh_requests_user_created on public.hh_requests (user_id, created_at desc);
alter table public.hh_requests enable row level security;

create policy "Read own requests" on public.hh_requests
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Add own requests" on public.hh_requests
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Delete own requests" on public.hh_requests
  for delete to authenticated using ((select auth.uid()) = user_id);

grant select, insert, update on public.hh_profiles to authenticated;
grant select, insert, delete on public.hh_requests to authenticated;
revoke all on public.hh_profiles, public.hh_requests from anon;
