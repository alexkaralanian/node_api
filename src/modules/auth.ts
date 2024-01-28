import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Response, NextFunction } from 'express';
import { MyRequest } from '../../types';

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: MyRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  console.log(bearer);

  if (!bearer) {
    res.status(401);
    res.send('Not A Valid Token');
    return;
  }

  const [_, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.send('Not A Valid Token');
    return;
  }

  try {
    const auth = jwt.verify(token, process.env.JWT_SECRET as string);
    const payload = { user: auth, id: '123' };
    req.session = payload;
    console.log('PAYLOAD', payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send('Not Authorized');
    return;
  }
};
