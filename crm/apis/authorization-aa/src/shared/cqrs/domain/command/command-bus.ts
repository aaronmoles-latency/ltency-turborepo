import { Command } from './command';

export abstract class CommandBus {
	abstract dispatch(command: Command<any>): Promise<void>;
}
