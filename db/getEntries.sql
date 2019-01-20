SELECT * 
from journal
where users_id = $1
order by id desc;