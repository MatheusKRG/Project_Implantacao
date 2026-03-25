create extension if not exists "pgcrypto";

create table if not exists public.games (
  id bigserial primary key,
  slug text not null unique,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.option_categories (
  id bigserial primary key,
  game_id bigint not null references public.games(id) on delete cascade,
  key text not null,
  label text not null,
  option_kind text not null check (option_kind in ('profile', 'equipment', 'skill')),
  created_at timestamptz not null default now(),
  unique (game_id, key)
);

create table if not exists public.game_options (
  id bigserial primary key,
  game_id bigint not null references public.games(id) on delete cascade,
  category_id bigint not null references public.option_categories(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, name)
);

create table if not exists public.builds_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id bigint not null references public.games(id) on delete restrict,
  title text not null,
  character_option_id bigint references public.game_options(id) on delete set null,
  custom_character_name text,
  role text not null check (role in ('tank', 'dps', 'support')),
  description text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.build_option_values (
  id bigserial primary key,
  build_id uuid not null references public.builds_v2(id) on delete cascade,
  category_id bigint not null references public.option_categories(id) on delete restrict,
  slot_index integer not null default 1,
  option_id bigint references public.game_options(id) on delete set null,
  custom_value text,
  created_at timestamptz not null default now(),
  unique (build_id, category_id, slot_index)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists builds_v2_set_updated_at on public.builds_v2;
create trigger builds_v2_set_updated_at
before update on public.builds_v2
for each row execute function public.set_updated_at();

alter table public.builds_v2 enable row level security;
alter table public.build_option_values enable row level security;

create policy "Public can read public builds v2"
on public.builds_v2
for select
using (is_public = true);

create policy "Users can read own builds v2"
on public.builds_v2
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own builds v2"
on public.builds_v2
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own builds v2"
on public.builds_v2
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own builds v2"
on public.builds_v2
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Public can read option values for public builds"
on public.build_option_values
for select
using (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.is_public = true
  )
);

create policy "Users can read own option values"
on public.build_option_values
for select
to authenticated
using (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.user_id = auth.uid()
  )
);

create policy "Users can insert own option values"
on public.build_option_values
for insert
to authenticated
with check (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.user_id = auth.uid()
  )
);

create policy "Users can update own option values"
on public.build_option_values
for update
to authenticated
using (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.user_id = auth.uid()
  )
);

create policy "Users can delete own option values"
on public.build_option_values
for delete
to authenticated
using (
  exists (
    select 1
    from public.builds_v2
    where builds_v2.id = build_option_values.build_id
      and builds_v2.user_id = auth.uid()
  )
);

insert into public.games (slug, name)
values
  ('bloodborne', 'Bloodborne'),
  ('elden-ring', 'Elden Ring')
on conflict (slug) do update set name = excluded.name;

insert into public.option_categories (game_id, key, label, option_kind)
select g.id, 'character', 'Classe ou arquetipo', 'profile'
from public.games g
on conflict (game_id, key) do nothing;

insert into public.option_categories (game_id, key, label, option_kind)
select g.id, category.key, category.label, category.option_kind
from public.games g
join (
  values
    ('bloodborne', 'trick_weapon', 'Arma transformavel', 'equipment'),
    ('bloodborne', 'firearm', 'Arma de fogo', 'equipment'),
    ('bloodborne', 'armor', 'Vestimenta', 'equipment'),
    ('bloodborne', 'runes', 'Runa Caryll principal', 'equipment'),
    ('bloodborne', 'blood_gem', 'Gema de sangue', 'equipment'),
    ('bloodborne', 'hunter_tools', 'Ferramenta de cacador', 'skill'),
    ('bloodborne', 'combat_style', 'Estilo de combate', 'skill'),
    ('elden-ring', 'main_weapon', 'Arma principal', 'equipment'),
    ('elden-ring', 'secondary_weapon', 'Arma secundaria ou escudo', 'equipment'),
    ('elden-ring', 'armor', 'Armadura ou set', 'equipment'),
    ('elden-ring', 'talismans', 'Talisma', 'equipment'),
    ('elden-ring', 'ashes', 'Cinza da Guerra', 'skill'),
    ('elden-ring', 'spells', 'Feiticaria ou encantamento', 'skill')
) as category(slug, key, label, option_kind)
  on category.slug = g.slug
on conflict (game_id, key) do update
set label = excluded.label,
    option_kind = excluded.option_kind;

with option_rows as (
  select * from (
    values
      ('bloodborne', 'character', 'Cacador de Pericia', 1),
      ('bloodborne', 'character', 'Cacador de Forca', 2),
      ('bloodborne', 'character', 'Pistoleiro de Sangue', 3),
      ('bloodborne', 'character', 'Erudito Arcano', 4),
      ('bloodborne', 'character', 'Cacador de Besta', 5),
      ('bloodborne', 'trick_weapon', 'Cutelo Serrilhado', 1),
      ('bloodborne', 'trick_weapon', 'Machado do Cacador', 2),
      ('bloodborne', 'trick_weapon', 'Bengala Chicote', 3),
      ('bloodborne', 'trick_weapon', 'Espada Sagrada de Ludwig', 4),
      ('bloodborne', 'trick_weapon', 'Rakuyo', 5),
      ('bloodborne', 'trick_weapon', 'Chikage', 6),
      ('bloodborne', 'firearm', 'Pistola do Cacador', 1),
      ('bloodborne', 'firearm', 'Blunderbuss do Cacador', 2),
      ('bloodborne', 'firearm', 'Evelyn', 3),
      ('bloodborne', 'firearm', 'Pistola Repetidora', 4),
      ('bloodborne', 'armor', 'Set do Cacador', 1),
      ('bloodborne', 'armor', 'Set Pena de Corvo', 2),
      ('bloodborne', 'armor', 'Set do Coro', 3),
      ('bloodborne', 'armor', 'Set de Cainhurst', 4),
      ('bloodborne', 'runes', 'Rapture de Sangue', 1),
      ('bloodborne', 'runes', 'Metamorfose Anti-Horaria', 2),
      ('bloodborne', 'runes', 'Clawmark', 3),
      ('bloodborne', 'runes', 'Great Lake', 4),
      ('bloodborne', 'blood_gem', 'Gema de Sangue Temperada', 1),
      ('bloodborne', 'blood_gem', 'Gema de Sangue Afiada', 2),
      ('bloodborne', 'blood_gem', 'Gema de Sangue Pesada', 3),
      ('bloodborne', 'blood_gem', 'Gema de Sangue de Fogo', 4),
      ('bloodborne', 'blood_gem', 'Gema de Sangue de Raio', 5),
      ('bloodborne', 'blood_gem', 'Gema de Sangue Arcana', 6),
      ('bloodborne', 'blood_gem', 'Gema de Sangue Nutridora', 7),
      ('bloodborne', 'hunter_tools', 'Augurio de Ebrietas', 1),
      ('bloodborne', 'hunter_tools', 'Chamado Alem', 2),
      ('bloodborne', 'hunter_tools', 'Luva do Executor', 3),
      ('bloodborne', 'combat_style', 'Ataque visceral', 1),
      ('bloodborne', 'combat_style', 'Parry com pistola', 2),
      ('bloodborne', 'combat_style', 'Quickstep agressivo', 3),
      ('elden-ring', 'character', 'Mago Cariano', 1),
      ('elden-ring', 'character', 'Cavaleiro de Forca', 2),
      ('elden-ring', 'character', 'Cruzado da Fe', 3),
      ('elden-ring', 'character', 'Samurai de Sangramento', 4),
      ('elden-ring', 'character', 'Paladino da Erdtree', 5),
      ('elden-ring', 'main_weapon', 'Moonveil', 1),
      ('elden-ring', 'main_weapon', 'Lamina Blasfema', 2),
      ('elden-ring', 'main_weapon', 'Esmaga-Gigantes', 3),
      ('elden-ring', 'main_weapon', 'Rios de Sangue', 4),
      ('elden-ring', 'main_weapon', 'Dark Moon Greatsword', 5),
      ('elden-ring', 'main_weapon', 'Bloodhound''s Fang', 6),
      ('elden-ring', 'main_weapon', 'Godskin Peeler', 7),
      ('elden-ring', 'main_weapon', 'Cross-Naginata', 8),
      ('elden-ring', 'secondary_weapon', 'Escudo Grande Dourado', 1),
      ('elden-ring', 'secondary_weapon', 'Selo da Erdtree', 2),
      ('elden-ring', 'secondary_weapon', 'Cetro Regio Cariano', 3),
      ('elden-ring', 'secondary_weapon', 'Fingerprint Stone Shield', 4),
      ('elden-ring', 'armor', 'Set de Azur', 1),
      ('elden-ring', 'armor', 'Set Bode-Touro', 2),
      ('elden-ring', 'armor', 'Set do Sentinela da Arvore', 3),
      ('elden-ring', 'armor', 'Set do Cavaleiro Cariano', 4),
      ('elden-ring', 'talismans', 'Favor da Erdtree', 1),
      ('elden-ring', 'talismans', 'Talisma de Massa de Pedra', 2),
      ('elden-ring', 'talismans', 'Exultacao do Senhor do Sangue', 3),
      ('elden-ring', 'talismans', 'Icone de Godfrey', 4),
      ('elden-ring', 'talismans', 'Shard of Alexander', 5),
      ('elden-ring', 'talismans', 'Radagon Icon', 6),
      ('elden-ring', 'talismans', 'Magic Scorpion Charm', 7),
      ('elden-ring', 'ashes', 'Seppuku', 1),
      ('elden-ring', 'ashes', 'Garra do Leao', 2),
      ('elden-ring', 'ashes', 'Passo do Sabueso', 3),
      ('elden-ring', 'ashes', 'Hoarfrost Stomp', 4),
      ('elden-ring', 'ashes', 'Bloody Slash', 5),
      ('elden-ring', 'ashes', 'Sacred Blade', 6),
      ('elden-ring', 'spells', 'Cometa Azur', 1),
      ('elden-ring', 'spells', 'Grande Arco de Loretta', 2),
      ('elden-ring', 'spells', 'Voto Dourado', 3),
      ('elden-ring', 'spells', 'Chama Negra', 4),
      ('elden-ring', 'spells', 'Ranni''s Dark Moon', 5),
      ('elden-ring', 'spells', 'Stars of Ruin', 6)
  ) as seeded(slug, category_key, option_name, sort_order)
)
insert into public.game_options (game_id, category_id, name, sort_order)
select
  g.id,
  c.id,
  option_rows.option_name,
  option_rows.sort_order
from option_rows
join public.games g
  on g.slug = option_rows.slug
join public.option_categories c
  on c.game_id = g.id
 and c.key = option_rows.category_key
on conflict (category_id, name) do update
set sort_order = excluded.sort_order;
