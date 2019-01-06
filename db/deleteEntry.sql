delete from journal
where id = $1;

select j.*, u.id as users_id
from journal j
join users u on u.id = j.users_id
where u.id = $2;