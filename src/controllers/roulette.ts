import { Response, Request, Application, NextFunction } from 'express';
import { check } from 'express-validator';
import validation from '../middlewares/validation';
import CreateRouletteUseCase from '../usecases/CreateRouletteUseCase';

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

export default (app: Application): void => {
  app.post(
    `/${BASE_PATH}`,
    [check('name').isString().notEmpty()],
    validation,
    creatRoulette
  );
};
