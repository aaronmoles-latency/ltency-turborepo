import { NewableClass } from '@latency/core';

import { Command } from './command';

export default abstract class CommandHandler<C extends Command<any>> {
	private readonly _commandName: string;

	protected constructor(command: NewableClass<C>) {
		this._commandName = command.name;
	}

	public subscribedTo(): string {
		return this._commandName;
	}

	abstract handle(command: C): Promise<void>;
}
