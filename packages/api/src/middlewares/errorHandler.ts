/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { AssertionError } from 'assert';

const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line no-console
		console.log(
			`Method: ${req.method} URL: ${req.url} Error: ${error.message}`
		);
	}

	if (error instanceof AssertionError) {
		res.status(400).send({ message: error.message, errors: [] });
		return;
	}

	res.status(500).send({ error: error.message });
};

export default errorHandler;
