import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response): void => {
	res.send({
		message: 'Server is running!!!'
	});
});

export default router;
