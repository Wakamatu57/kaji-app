-- グループテーブル
create table groups (
  group_id serial primary key,
  name text not null,
  password text not null,
  created_at timestamptz default now()
);

-- ユーザーテーブル
create table users (
  user_id uuid primary key, -- supabase auth.users.id と同じ
  username text not null,
  email text unique not null,
  group_id int references groups(group_id),
  created_at timestamptz default now()
);

-- タスクテーブル
create table tasks (
  task_id serial primary key,
  title text not null,
  category text not null,
  date text default not null,
  user_id uuid references users(user_id), -- Supabase auth id を外部キーにする
  created_at timestamptz default now()
);
