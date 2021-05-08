/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT: string = process.env['PORT'] || '3000';

const main = async (): Promise<void> => {
	await app.listen(PORT);

	// tslint:disable-next-line:no-console
	console.log(`App running on port ${PORT}`);
};

main();
