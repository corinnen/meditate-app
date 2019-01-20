SELECT * FROM time_log
WHERE users_id = $1
order by id desc;