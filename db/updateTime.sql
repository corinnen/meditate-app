UPDATE time_log
SET timestamp = $2, length_of_time = $3
WHERE id = $1;


SELECT t.*, u.id as users_id
FROM time_log t
JOIN users u ON u.id = t.users_id
WHERE u.id= $4;
