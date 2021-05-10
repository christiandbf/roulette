import { Response, Request, NextFunction } from 'express';

export default jest
	.fn()
	.mockImplementation(
		() => (req: Request, res: Response, next: NextFunction) => {
			next();
		}
	);
