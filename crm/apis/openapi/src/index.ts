/* eslint-disable no-console */
import 'reflect-metadata';
import 'module-alias/register';

import { TypeormExpressApp } from './typeorm-express.app';

try {
	new TypeormExpressApp().start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error);
	process.exit(1);
});
