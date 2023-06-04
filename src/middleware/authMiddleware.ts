import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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
    req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};
