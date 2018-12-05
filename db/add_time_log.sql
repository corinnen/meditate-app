INSERT into time_log (timestamp, length_of_time, Users_id)
VALUES ($1, $2, $3);

SELECT timestamp, length_of_time 
FROM time_log
WHERE Users_id = $3