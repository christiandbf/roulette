import { Response, Request, NextFunction, Router } from 'express';
import { check, param } from 'express-validator';
import validation from '../middlewares/validation';
import {
	CreateRouletteUseCase,
	OpenRouletteUseCase,
	CloseRouletteUseCase,
	ListRouletteUseCase,
	RouletteResponseModel,
	GameResponseModel,
	RepositoryManager
} from '@roulette/core';

const router: Router = Router();

router.post(
	`/`,
	[check('name').isString().notEmpty()],
	validation,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { name } = req.body;
			const repository = RepositoryManager.getInstance();
			const createRouletteUseCase = new CreateRouletteUseCase(repository);
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
			const repository = RepositoryManager.getInstance();
			const openRouletteUseCase = new OpenRouletteUseCase(repository);
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
			const repository = RepositoryManager.getInstance();
			const closeRouletteUseCase = new CloseRouletteUseCase(repository);
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
			const repository = RepositoryManager.getInstance();
			const listRouletteUseCase = new ListRouletteUseCase(repository);
			const rouletteDTOs = await listRouletteUseCase.execute();
			res.status(200).send(rouletteDTOs);
		} catch (error) {
			next(error);
		}
	}
);

export default router;
