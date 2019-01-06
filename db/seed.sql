CREATE TABLE users (ID serial primary key, name varchar, email varchar, password varchar);

CREATE TABLE time_log (id serial primary key, timestamp TIMESTAMP, length_of_time INTEGER,
Users_ID INT REFERENCES users);

CREATE TABLE journal (id serial primary key, title varchar, content varchar, users_id INT references users, date);