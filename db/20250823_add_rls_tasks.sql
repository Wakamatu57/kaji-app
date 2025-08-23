-- === タスク共有用 RLS ポリシー適用 ===

-- まず RLS を有効化
alter table tasks enable row level security;

-- 既存ポリシーがあれば削除（再適用用）
drop policy if exists "Users can read tasks in their group" on tasks;
drop policy if exists "Users can insert tasks in their group" on tasks;
drop policy if exists "Users can update tasks in their group" on tasks;
drop policy if exists "Users can delete tasks in their group" on tasks;

-- グループ内のタスクを取得できる
create policy "Users can read tasks in their group"
on tasks
for select
using (
  exists (
    select 1
    from users u1
    join users u2 on u1.group_id = u2.group_id
    where u1.user_id = auth.uid()
      and u2.user_id = tasks.user_id
  )
);

-- グループ内でタスクを追加できる
create policy "Users can insert tasks in their group"
on tasks
for insert
with check (
  exists (
    select 1
    from users u1
    join users u2 on u1.group_id = u2.group_id
    where u1.user_id = auth.uid()
      and u2.user_id = tasks.user_id
  )
);

-- グループ内のタスクを更新できる
create policy "Users can update tasks in their group"
on tasks
for update
using (
  exists (
    select 1
    from users u1
    join users u2 on u1.group_id = u2.group_id
    where u1.user_id = auth.uid()
      and u2.user_id = tasks.user_id
  )
);

-- グループ内のタスクを削除できる
create policy "Users can delete tasks in their group"
on tasks
for delete
using (
  exists (
    select 1
    from users u1
    join users u2 on u1.group_id = u2.group_id
    where u1.user_id = auth.uid()
      and u2.user_id = tasks.user_id
  )
);
