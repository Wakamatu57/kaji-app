-- 同じグループに所属するユーザーは閲覧可能
create policy "Users can view members of their group"
on users
for select
using (
  exists (
    select 1
    from users as self
    where self.user_id = auth.uid()
      and self.group_id = users.group_id
  )
);

-- 自分自身は更新可能
create policy "Users can update themselves"
on users
for update
using (user_id = auth.uid());

-- 自分自身のユーザー行だけ作成可能
create policy "Users can insert themselves"
on users
for insert
with check (user_id = auth.uid());
