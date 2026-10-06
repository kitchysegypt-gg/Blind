-- Helpers reply to a request through a private link, without an account.
alter table public.hh_requests
  add column token uuid not null default gen_random_uuid(),
  add column status text not null default 'sent'
    check (status in ('sent', 'seen', 'coming', 'later', 'cant', 'done')),
  add column status_at timestamptz,
  add column requester_name text check (char_length(requester_name) <= 120),
  add column address text check (char_length(address) <= 500),
  add column location_url text check (char_length(location_url) <= 300);
create unique index hh_requests_token on public.hh_requests (token);
create index hh_requests_user_status_at on public.hh_requests (user_id, status_at);

-- What the helper sees: only this one request, found by its secret link.
create function public.hh_request_for_helper(p_token uuid)
returns table (type text, text text, requester_name text, address text, location_url text, status text, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select r.type, r.text, r.requester_name, r.address, r.location_url, r.status, r.created_at
  from public.hh_requests r where r.token = p_token;
$$;

-- The helper's answer. "seen" only moves a request on from "sent".
create function public.hh_helper_reply(p_token uuid, p_status text)
returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_status not in ('seen', 'coming', 'later', 'cant', 'done') then
    raise exception 'unknown status %', p_status;
  end if;
  update public.hh_requests
     set status = p_status, status_at = now()
   where token = p_token and (p_status <> 'seen' or status = 'sent');
  return found;
end;
$$;

revoke all on function public.hh_request_for_helper(uuid) from public;
revoke all on function public.hh_helper_reply(uuid, text) from public;
grant execute on function public.hh_request_for_helper(uuid) to anon, authenticated;
grant execute on function public.hh_helper_reply(uuid, text) to anon, authenticated;
