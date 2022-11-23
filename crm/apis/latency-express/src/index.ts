/* eslint-disable no-console */
import 'reflect-metadata';

import { LatencyExpressApp } from './latency-express.app';

try {
	new LatencyExpressApp().start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error);
	process.exit(1);
});
