import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

interface Token {
  data: TokenData,
  iat: number,
  exp: number
}

export interface TokenData {
  username: string,
}

export interface ReqData extends Request {
  data?: TokenData,
}

const createToken = (user: TokenData): string => {
  const token = jwt.sign({ data: user }, SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

const validateToken = (req: ReqData, res: Response, next: NextFunction): TokenData | void => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }
    const decoded = jwt.verify(token as string, SECRET) as Token;
    req.data = decoded.data;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const decodeToken = (token: string) => {
  try {
    token = token.replace('Bearer ', '');
    const  userid  = jwt.verify(token, SECRET) as Token;
    const returnedUserName = userid.data.username;
    const userData = { returnedUserName }
    return userData;
  } catch (error) {
    return null;
  }
}

export { createToken, validateToken, decodeToken };
