import { Command } from './command';

export class CommandNotRegisteredError extends Error {
	constructor(command: Command) {
		super(`The command <${command.constructor.name}> has not a command handler associated`);
	}
}
