-- 所属するグループだけ読める
create policy "Users can view their group"
on groups
for select
using (
  exists (
    select 1
    from users
    where users.user_id = auth.uid()
      and users.group_id = groups.group_id
  )
);

-- グループを新規作成できる
create policy "Anyone can create a group"
on groups
for insert
with check (true);
