-- 全員に SELECT を許可
create policy "Allow select for authenticated users"
on tasks
for select
using (true);

-- 全員に INSERT を許可（ただし必ず自分の user_id でしか作れない）
create policy "Allow insert for authenticated users"
on tasks
for insert
with check (user_id = auth.uid());

-- UPDATE は自分のタスクのみ
create policy "Users can update their own tasks"
on tasks
for update
using (user_id = auth.uid());

-- DELETE も自分のタスクのみ
create policy "Users can delete their own tasks"
on tasks
for delete
using (user_id = auth.uid());
