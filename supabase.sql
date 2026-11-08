-- Rode no Supabase: SQL Editor > New query > Run.
create table if not exists public.user_data (
  user_id uuid primary key default auth.uid() references auth.users on delete cascade,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.user_data enable row level security;

drop policy if exists "user_data: só o dono" on public.user_data;
create policy "user_data: só o dono" on public.user_data
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
