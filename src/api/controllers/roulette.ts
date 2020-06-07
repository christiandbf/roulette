import { Response, Request, NextFunction, Router } from 'express';
import { check, param } from 'express-validator';
import validation from '../middlewares/validation';
import {
  CreateRouletteUseCase,
  OpenRouletteUseCase,
  CloseRouletteUseCase,
  ListRouletteUseCase,
  RouletteResponseModel,
  GameResponseModel
} from '../../core';

const router: Router = Router();

router.post(
  `/`,
  [check('name').isString().notEmpty()],
  validation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body;
      const createRouletteUseCase = new CreateRouletteUseCase();
      const rouletteResponseModel: RouletteResponseModel = await createRouletteUseCase.execute(
        {
          name: name
        }
      );
      res.status(201).send(rouletteResponseModel);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  `/open/:id`,
  [param('id').isUUID()],
  validation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rouletteId: string = req.params.id;
      const openRouletteUseCase = new OpenRouletteUseCase();
      const rouletteResponseModel = await openRouletteUseCase.execute(
        rouletteId
      );
      res.status(200).send(rouletteResponseModel);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  `/close/:id`,
  [param('id').isUUID()],
  validation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rouletteId: string = req.params.id;
      const closeRouletteUseCase = new CloseRouletteUseCase();
      const gameResponseModel: GameResponseModel = await closeRouletteUseCase.execute(
        rouletteId
      );
      res.status(200).send(gameResponseModel);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  `/`,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const listRouletteUseCase = new ListRouletteUseCase();
      const rouletteDTOs = await listRouletteUseCase.execute({});
      res.status(200).send(rouletteDTOs);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
