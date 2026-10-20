-- Live tracking, two ways.

-- 1. The helper's position while they are on the way to a request.
alter table public.hh_requests
  add column helper_lat double precision check (helper_lat between -90 and 90),
  add column helper_lng double precision check (helper_lng between -180 and 180),
  add column helper_at timestamptz;

-- The helper page sends this every few seconds after "I'm on my way".
-- It only works while the request is "coming".
create function public.hh_helper_location(p_token uuid, p_lat double precision, p_lng double precision)
returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_lat not between -90 and 90 or p_lng not between -180 and 180 then
    raise exception 'bad position';
  end if;
  update public.hh_requests
     set helper_lat = p_lat, helper_lng = p_lng, helper_at = now()
   where token = p_token and status = 'coming';
  return found;
end;
$$;

-- 2. The person's own live position, shared with family through a private link.
--    One row per person; deleting it stops the link.
create table public.hh_live (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  name text check (char_length(name) <= 120),
  lat double precision not null check (lat between -90 and 90),
  lng double precision not null check (lng between -180 and 180),
  acc real,
  updated_at timestamptz not null default now()
);
alter table public.hh_live enable row level security;
create policy "own live: read" on public.hh_live for select to authenticated using (user_id = (select auth.uid()));
create policy "own live: add" on public.hh_live for insert to authenticated with check (user_id = (select auth.uid()));
create policy "own live: update" on public.hh_live for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own live: delete" on public.hh_live for delete to authenticated using (user_id = (select auth.uid()));

-- What the family sees: only this one position, found by its secret link.
create function public.hh_live_for_token(p_token uuid)
returns table (name text, lat double precision, lng double precision, acc real, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select l.name, l.lat, l.lng, l.acc, l.updated_at from public.hh_live l where l.token = p_token;
$$;

revoke all on function public.hh_helper_location(uuid, double precision, double precision) from public;
revoke all on function public.hh_live_for_token(uuid) from public;
grant execute on function public.hh_helper_location(uuid, double precision, double precision) to anon, authenticated;
grant execute on function public.hh_live_for_token(uuid) to anon, authenticated;
