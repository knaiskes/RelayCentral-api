-- Docker will create the database central
\c central;

CREATE TABLE IF NOT EXISTS relays (
id SERIAL PRIMARY KEY,
relay_name VARCHAR(10) NOT NULL
);

GRANT SELECT ON relays TO postgres;
