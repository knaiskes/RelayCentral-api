import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import createPool from '../config/db';

const pool = createPool();

const loginController = async (req: Request, res: Response) => {
    const secretKey = process.env.TOKEN_SECRET as string;
    const { username, password } = req.body;

    pool.query(`SELECT id FROM users WHERE username = $1 AND password = crypt($2, password)`,
	       [username, password], (err, result) => {
		   if (err) {
		       console.error('Error executing query', err);
		       res.status(500).json({ error: 'Internal server error' });
		       return;
		   }

		   if (result.rows.length === 0) {
		       res.status(404).json({ error: 'User not found' });
		       return;
		   }

        const user = result.rows[0];
        const token = jwt.sign(user, secretKey);
        res.json({ token });
      });
};

export { loginController };
