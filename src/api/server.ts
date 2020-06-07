/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import healthcheck from './controllers/healthcheck';
import roulette from './controllers/roulette';
import bet from './controllers/bet';
import errorHandler from './middlewares/errorHandler';

const PORT: string = process.env['PORT'] || '3000';

const main = async (): Promise<void> => {
  app.get('/', healthcheck);
  app.use('/roulettes', roulette);
  app.use('/bets', bet);
  app.use(errorHandler);

  await app.listen(PORT);

  // tslint:disable-next-line:no-console
  console.log(`App running on port ${PORT}`);
};

main();
