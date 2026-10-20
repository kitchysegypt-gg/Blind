-- Firebase push tokens: one row per phone, so notifications can reach that person.
create table public.hh_push_tokens (
  token text primary key check (char_length(token) between 10 and 4096),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  platform text not null default 'android' check (platform in ('android', 'ios', 'web')),
  lang text check (lang in ('en', 'ar')),
  updated_at timestamptz not null default now()
);
create index hh_push_tokens_user_id_idx on public.hh_push_tokens (user_id);
alter table public.hh_push_tokens enable row level security;
create policy "own push tokens: read" on public.hh_push_tokens for select to authenticated using (user_id = (select auth.uid()));
create policy "own push tokens: add" on public.hh_push_tokens for insert to authenticated with check (user_id = (select auth.uid()));
create policy "own push tokens: update" on public.hh_push_tokens for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own push tokens: delete" on public.hh_push_tokens for delete to authenticated using (user_id = (select auth.uid()));
