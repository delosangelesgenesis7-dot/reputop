-- Tabla de restaurantes
create table restaurants (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text not null,
  google_url text not null,
  slug text unique not null default lower(replace(gen_random_uuid()::text, '-', '')),
  created_at timestamptz default now()
);

-- Tabla de solicitudes de reseña
create table review_requests (
  id uuid default gen_random_uuid() primary key,
  restaurant_id uuid references restaurants(id) on delete cascade not null,
  phone text,
  clicked boolean default false,
  clicked_at timestamptz,
  created_at timestamptz default now()
);

-- Seguridad: solo el dueño ve sus datos
alter table restaurants enable row level security;
alter table review_requests enable row level security;

create policy "Dueño ve su restaurante"
  on restaurants for all
  using (auth.uid() = user_id);

create policy "Dueño ve sus solicitudes"
  on review_requests for all
  using (
    restaurant_id in (
      select id from restaurants where user_id = auth.uid()
    )
  );

-- Lectura pública del slug (para la página de redirección)
create policy "Público puede leer por slug"
  on restaurants for select
  using (true);

-- Actualización pública de clicks (para tracking)
create policy "Público puede marcar click"
  on review_requests for update
  using (true);
