/* eslint-disable @typescript-eslint/no-unused-vars */
import os from 'os';
import { Response, Request, NextFunction } from 'express';
import app from './app';
import roulette from './controllers/roulette';
import { AssertionError } from 'assert';

const PORT: string = process.env['PORT'] || '3000';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(
      `Method: ${req.method} URL: ${req.url} Error: ${error.message}`
    );
  }

  if (error instanceof AssertionError) {
    res.status(400).send({ message: error.message, erros: [] });
    return;
  }

  res.status(500).send({ error: error.message });
};

const main = async (): Promise<void> => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Service running properly' });
  });

  roulette(app);

  app.use(errorHandler);

  await app.listen(PORT);

  // tslint:disable-next-line:no-console
  console.log(`App running on port ${PORT}`);
};

main();
