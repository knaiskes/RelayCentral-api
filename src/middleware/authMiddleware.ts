import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../interfaces/interfaces'

const secretKey = process.env.TOKEN_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { path } = req;
  const token = req.headers['authorization'];

  // Skip token verification for the login and refresh-token routes
  if (path === '/login' || path === '/refresh-token') {
    next();
    return;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token as string, secretKey);
    req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};
