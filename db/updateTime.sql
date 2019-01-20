UPDATE time_log
SET length_of_time = $2
WHERE id = $1;


SELECT t.*, u.id as users_id
FROM time_log t
JOIN users u ON u.id = t.users_id
WHERE u.id= $3
order by id desc;
