import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default (req: Request, res: Response, next: NextFunction): void => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res
			.status(400)
			.json({ message: 'Not valid params', errors: errors.array() });
		return;
	}
	next();
};
