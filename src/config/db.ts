import pkg from 'pg';
const { Pool } = pkg;

export default function createPool() {
  return new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'central',
    port: 5432,
  });
}
