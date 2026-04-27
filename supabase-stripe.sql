-- Agregar campos de Stripe a la tabla restaurants
alter table restaurants
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;
