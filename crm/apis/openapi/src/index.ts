/* eslint-disable no-console */
import 'reflect-metadata';
import 'module-alias/register';

import { TypeormExpressApp } from './typeorm-express.app';

const app = new TypeormExpressApp()

try {
	app.start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error);
	process.exit(1);
});

const handleStop = async (code: string) => {
	console.log(`Received ${code} signal. Closing services...`);
	await app.stop();
	console.log('Services closed.')
	process.exit(0)
}

process.on('SIGINT', handleStop);
process.on('SIGTERM', handleStop);
