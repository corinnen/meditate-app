INSERT INTO journal (title, content, users_id, date)
VALUES ($1, $2, $3, $4);

SELECT *
FROM journal 
WHERE users_id = $3;


