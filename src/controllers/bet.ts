import { strict as assert } from 'assert';
import { Response, Request, NextFunction, Router } from 'express';
import { check, header } from 'express-validator';
import validation from '../middlewares/validation';
import CreateBetUseCase from '../usecases/CreateBetUseCase';

const router: Router = Router();

interface CreateBetBody {
  selection: string;
  rouletteId: string;
  amount: number;
}

router.post(
  `/`,
  [
    check('selection').isString().notEmpty(),
    check('rouletteId').isUUID(),
    check('amount').isNumeric(),
    header('user').isUUID()
  ],
  validation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createBetBody: CreateBetBody = req.body as CreateBetBody;
      const userId: string | undefined = req.get('user');
      assert.ok(userId, 'User ID has not been sent');
      const createRouletteUseCase = new CreateBetUseCase();
      const rouletteDTO = await createRouletteUseCase.execute({
        userId: userId,
        amount: createBetBody.amount,
        rouletteId: createBetBody.rouletteId,
        selection: createBetBody.selection
      });

      res.status(201).send(rouletteDTO);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
