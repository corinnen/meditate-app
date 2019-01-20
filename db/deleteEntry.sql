delete from journal
WHERE id = $1;

SELECT j.*, u.id AS users_id
FROM journal j
JOIN users u ON u.id = j.users_id
WHERE u.id = $2;