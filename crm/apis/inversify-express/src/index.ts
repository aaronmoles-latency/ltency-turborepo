/* eslint-disable no-console */
import 'reflect-metadata';
import './container';
import './database';

import { InversifyExpressApp } from './inversify-express.app';

try {
	new InversifyExpressApp().start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error);
	process.exit(1);
});
