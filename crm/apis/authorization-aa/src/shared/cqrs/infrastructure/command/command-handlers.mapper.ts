import { Command } from '../../domain/command/command';
import CommandHandler from '../../domain/command/command-handler';
import { CommandNotRegisteredError } from '../../domain/command/command-not-registered.error';

export class CommandHandlersMapper extends Map<string, CommandHandler<Command>> {
	constructor(
		commandHandlers: Array<CommandHandler<Command>>,
	) {
		super()
		commandHandlers.forEach((commandHandler) => {
			this.set(commandHandler.subscribedTo(), commandHandler);
		});
	}

	public search(command: Command): CommandHandler<Command> {
		const commandHandler = this.get(command.constructor.name);
		if (!commandHandler) {
			throw new CommandNotRegisteredError(command);
		}
		return commandHandler;
	}
}
