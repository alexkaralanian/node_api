import express, { Express, Request, Response } from 'express';
// import router from './routes';

const app: Express = express();

// app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  console.log('Hello World');
  res.status(200).json({ message: 'hello world' });
});

app.listen('3000', () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
