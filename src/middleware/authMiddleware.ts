import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../interfaces/interfaces'

const secretKey = process.env.TOKEN_SECRET as string;

interface CustomRequest extends Request {
  user: User;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { path } = req;
  const token = req.headers['authorization'];

  // Skip token verification for the login route
  if (path === '/login') {
    next();
    return;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token as string, secretKey);
      const { user } = req;
    //req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};
