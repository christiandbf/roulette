import { Router } from 'express';
import healthcheck from './controllers/healthcheck';
import roulette from './controllers/roulette';
import bet from './controllers/bet';
import errorHandler from './middlewares/errorHandler';

const router: Router = Router();

router.get('/', healthcheck);
router.use('/roulettes', roulette);
router.use('/bets', bet);
router.use(errorHandler);

export default router;
