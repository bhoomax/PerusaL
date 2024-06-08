-- USERs TABLE
CREATE DATABASE IF NOT EXISTS Perusal;
CREATE TABLE users (id serial primary key,
					username varchar(20) UNIQUE NOT NULL,
				   userid varchar(5) UNIQUE NOT NULL,
				   usn varchar(20) unique not null,
				   fname VARCHAR(50),
					lname VARCHAR(50),
                     phno VARCHAR(100),
				   hash VARCHAR(255) NOT NULL,
    			           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				   );
				   
CREATE OR REPLACE FUNCTION generate_unique_userid()
RETURNS TRIGGER AS $$
BEGIN
    NEW.userid := LEFT(MD5(random()::text), 5);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_userid_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION generate_unique_userid();

CREATE TABLE AIML (userid varchar(5) primary key,
					 added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					foreign key(userid) references users(userid) on delete cascade);
CREATE TABLE AppDev (userid varchar(5) primary key,
					 added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					foreign key(userid) references users(userid) on delete cascade);
CREATE TABLE Cybersec (userid varchar(5) primary key,
					 added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					foreign key(userid) references users(userid) on delete cascade);
CREATE TABLE DevOps (userid varchar(5) primary key,
					 added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					foreign key(userid) references users(userid) on delete cascade);

CREATE TABLE WebDev (userid varchar(5) primary key,
					 added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					foreign key(userid) references users(userid) on delete cascade);