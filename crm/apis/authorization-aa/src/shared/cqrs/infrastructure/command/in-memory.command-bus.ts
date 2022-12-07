import Executor from '../../../executor';
import WrapperExecutor from '../../../wrapper-executor';
import { Command } from '../../domain/command/command';
import { CommandBus } from '../../domain/command/command-bus';
import { CommandHandlersMapper } from './command-handlers.mapper';

export class InMemoryCommandBus implements CommandBus {
	private readonly executor: Executor<Command, void>;

	constructor(
		private readonly commandHandlersMapper: CommandHandlersMapper,
		executors: WrapperExecutor<Command, void>[] = [],
	) {
		this.executor = new Executor<Command, void>(executors);
	}

	async dispatch(command: Command): Promise<void> {
		return this.executor.run(command, async () => {
			const handler = this.commandHandlersMapper.search(command);
			await handler.handle(command);
		})
	}
}
