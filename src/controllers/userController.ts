import { Request, Response } from 'express';
import createPool from '../config/db';

const pool = createPool();

const postUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and topic are required' });
  }

  try {
    const insertUserQuery = `INSERT INTO users (username, password) VALUES($1, crypt($2, gen_salt('bf'))) RETURNING id`;
    const result = await pool.query(insertUserQuery, [username, password]);
    res.status(201).json({ id: result.rows[0].id, username, password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { postUser };
