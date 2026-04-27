-- Agregar campos de plan y trial a la tabla restaurants
alter table restaurants
  add column if not exists plan text default 'trial',
  add column if not exists trial_ends_at timestamptz default (now() + interval '30 days');
