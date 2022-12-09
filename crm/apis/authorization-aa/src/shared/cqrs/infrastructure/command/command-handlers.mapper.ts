import { Command } from '../../domain/command/command';
import CommandHandler from '../../domain/command/command-handler';
import { CommandNotRegisteredError } from '../../domain/command/command-not-registered.error';

export class CommandHandlersMapper extends Map<string, CommandHandler<Command<unknown>>> {
	constructor(
		commandHandlers: Array<CommandHandler<Command<unknown>>>,
	) {
		super()
		commandHandlers.forEach((commandHandler) => {
			this.set(commandHandler.subscribedTo(), commandHandler);
		});
	}

	public search(command: Command<unknown>): CommandHandler<Command<unknown>> {
		const commandHandler = this.get(command.constructor.name);
		if (!commandHandler) {
			throw new CommandNotRegisteredError(command);
		}
		return commandHandler;
	}
}
