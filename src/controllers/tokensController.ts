import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import createPool from '../config/db';
import { User } from '../interfaces/interfaces';

const pool = createPool();

const accessTokenExpiration = '2d';
const refreshTokenExpiration = '3d';

const secretKeyToken = process.env.TOKEN_SECRET as string;
const secretKeyRefreshToken = process.env.TOKEN_SECRET_REFRESH as string;

const getTokenController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  pool.query(
    `SELECT id FROM users WHERE username = $1 AND password = crypt($2, password)`,
    [username, password],
    (err, result) => {
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
      const accessToken = jwt.sign(user, secretKeyToken, { expiresIn: accessTokenExpiration });
      const refreshToken = jwt.sign(user, secretKeyRefreshToken, {
        expiresIn: refreshTokenExpiration,
      });
      res.json({ accessToken, refreshToken });
    }
  );
};

const refreshTokenController = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, secretKeyRefreshToken) as User;
    const accessToken = jwt.sign({ id: decoded.id, username: decoded.username }, secretKeyToken, {
      expiresIn: accessTokenExpiration,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export { getTokenController, refreshTokenController };
