-- Secure admin check function using profiles
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = _user_id and p.role = 'admin'
  );
$$;

-- Ensure new signups are not admins by default
alter table public.profiles
  alter column role set default 'user';

-- Tighten contacts RLS: remove broad access and restrict to admins only
drop policy if exists "Authenticated users can view all contacts" on public.contacts;

create policy "Only admins can view contacts"
on public.contacts
for select
to authenticated
using (public.is_admin(auth.uid()));