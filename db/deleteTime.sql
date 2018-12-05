DELETE FROM time_log
WHERE id = $1;


SELECT t.*, u.id as users_id
FROM time_log t
JOIN users u ON u.id = t.users_id
WHERE u.id= $2;




