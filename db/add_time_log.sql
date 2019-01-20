INSERT into time_log (timestamp, length_of_time, Users_id)
VALUES ($1, $2, $3);

SELECT *
FROM time_log
WHERE Users_id = $3
ORDER BY id desc;