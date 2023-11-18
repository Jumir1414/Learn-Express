import express, { Request, Response } from 'express';

const app = express();
const port = 3500;

app.get('/', (_req:Request, res:Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});