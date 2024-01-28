import prisma from '../db';
import { Request, Response } from 'express';
import { createJWT, hashPassword, comparePasswords } from '../modules/auth';
import { MyRequest, User } from '../../types';

export const createNewUser = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: MyRequest, res: Response) => {
  const user: User | null = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user!.password);

  if (!isValid) {
    res.status(401);
    res.send('Invalid username or password');
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
