UDPATE journal
SET title = $2, content = $3, date = $4
Where id = $1;

SELECT j.*, u.id as users_id
FROM journal j
JOIN users u ON u.id = j.users_id;
