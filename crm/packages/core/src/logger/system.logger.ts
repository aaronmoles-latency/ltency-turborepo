/* eslint-disable no-console */
import { Logger } from './logger';

export class SystemLogger implements Logger {
	debug(message: string): void {
		console.debug(message);
	}

	error(message: string | Error): void {
		console.error(message);
	}

	info(message: string): void {
		console.info(message);
	}
}
