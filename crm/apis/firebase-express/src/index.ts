/* eslint-disable no-console */
import 'reflect-metadata';

import { FirebaseExpressApp } from './firebase-express.app';

try {
	new FirebaseExpressApp().start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error);
	process.exit(1);
});
