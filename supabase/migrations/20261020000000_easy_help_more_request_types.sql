-- New kinds of help: professionals (nurse, doctor, physiotherapy) and bills & papers.
alter table public.hh_requests drop constraint hh_requests_type_check;
alter table public.hh_requests add constraint hh_requests_type_check
  check (type in ('groceries', 'medicine', 'ride', 'helper', 'pro', 'errands', 'location'));
