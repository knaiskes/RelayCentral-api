-- Docker will create the database central
\c central;

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL -- TODO: Encrypt it
);

CREATE TABLE IF NOT EXISTS device_types (
id SERIAL PRIMARY KEY,
text VARCHAR(20) NOT NULL,
userId INT NOT NULL,

FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rooms (
id SERIAL PRIMARY KEY,
name VARCHAR(20) NOT NULL,
userId INT NOT NULL,

FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS relays (
id SERIAL PRIMARY KEY,
deviceTypeId INT NOT NULL,
name VARCHAR(10) NOT NULL,
state BOOLEAN DEFAULT false,

FOREIGN KEY(deviceTypeId) REFERENCES device_types(id)
);

GRANT SELECT ON relays TO postgres;
