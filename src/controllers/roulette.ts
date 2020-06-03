import { Response, Request, Application, NextFunction } from 'express';
import { check, param } from 'express-validator';
import validation from '../middlewares/validation';
import CreateRouletteUseCase from '../usecases/CreateRouletteUseCase';
import OpenRouletteUseCase from '../usecases/OpenRouletteUseCase';
import ListRouletteUseCase from '../usecases/ListRouletteUseCase';

const BASE_PATH = 'roulettes';

interface CreateRouletteBody {
  name: string;
}

const creatRoulette = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
};

const openRoulette = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rouletteId: string = req.params.id;
    const openRouletteUseCase = new OpenRouletteUseCase();
    const rouletteDTO = await openRouletteUseCase.execute({ id: rouletteId });
    res.status(200).send(rouletteDTO);
  } catch (error) {
    next(error);
  }
};

const listRoulette = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const listRouletteUseCase = new ListRouletteUseCase();
    const rouletteDTOs = await listRouletteUseCase.execute({});
    res.status(200).send(rouletteDTOs);
  } catch (error) {
    next(error);
  }
};

export default (app: Application): void => {
  app.post(
    `/${BASE_PATH}`,
    [check('name').isString().notEmpty()],
    validation,
    creatRoulette
  );

  app.put(
    `/${BASE_PATH}/open/:id`,
    [param('id').isUUID()],
    validation,
    openRoulette
  );

  app.get(`/${BASE_PATH}`, listRoulette);
};
