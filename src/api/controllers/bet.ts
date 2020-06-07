import { strict as assert } from 'assert';
import { Response, Request, NextFunction, Router } from 'express';
import { check, header } from 'express-validator';
import validation from '../middlewares/validation';
import { CreateBetUseCase, BetResponseModel } from '../../core';

const router: Router = Router();

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
      const { selection, rouletteId, amount } = req.body;
      const userId: string | undefined = req.get('user');
      assert.ok(userId, 'User ID has not been sent');
      const createRouletteUseCase = new CreateBetUseCase();
      const betResponseModel: BetResponseModel = await createRouletteUseCase.execute(
        {
          userId: userId,
          amount: amount,
          rouletteId: rouletteId,
          selection: selection
        }
      );

      res.status(201).send(betResponseModel);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
