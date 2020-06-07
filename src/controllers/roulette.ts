import { Response, Request, NextFunction, Router } from 'express';
import { check, param } from 'express-validator';
import validation from '../middlewares/validation';
import CreateRouletteUseCase from '../usecases/CreateRouletteUseCase';
import OpenRouletteUseCase from '../usecases/OpenRouletteUseCase';
import CloseRouletteUseCase from '../usecases/CloseRouletteUseCase';
import ListRouletteUseCase from '../usecases/ListRouletteUseCase';

const router: Router = Router();

interface CreateRouletteBody {
  name: string;
}

router.post(
  `/`,
  [check('name').isString().notEmpty()],
  validation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createRouletteBody: CreateRouletteBody = req.body as CreateRouletteBody;
      const createRouletteUseCase = new CreateRouletteUseCase();
      const rouletteDTO = await createRouletteUseCase.execute({
        name: createRouletteBody.name
      });
      res.status(201).send(rouletteDTO);
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
      const rouletteDTO = await openRouletteUseCase.execute({ id: rouletteId });
      res.status(200).send(rouletteDTO);
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
      const resultDTO = await closeRouletteUseCase.execute({ id: rouletteId });
      res.status(200).send(resultDTO);
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
