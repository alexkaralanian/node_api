import { Request } from 'express';

export interface MyRequest extends Request {
  session?: {
    user: any;
    id: string;
  };
}

export interface User {
  id: string;
  createdAt: Date;
  username: string;
  password: string;
}
