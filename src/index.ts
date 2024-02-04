import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import { MyRequest } from '../types';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: MyRequest, _res, next) => {
  req.session = { user: 'I am a user', id: '123' };
  next();
});

app.get('/hello', (req: MyRequest, res) => {
  res.status(200).json({ message: req.session });
});

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use('/api', protect, router);

app.listen('3000', () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
