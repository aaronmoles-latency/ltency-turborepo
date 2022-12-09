import { Service } from '../../../decorators/service.decorator';
import Executor from '../../../executor';
import WrapperExecutor from '../../../wrapper-executor';
import { Command } from '../../domain/command/command';
import { CommandBus } from '../../domain/command/command-bus';
import { CommandHandlersMapper } from './command-handlers.mapper';

@Service()
export class InMemoryCommandBus implements CommandBus {
	private readonly executor: Executor<Command<unknown>, void>;

	constructor(
		private readonly commandHandlersMapper: CommandHandlersMapper,
		executors: WrapperExecutor<Command<unknown>, void>[] = [],
	) {
		this.executor = new Executor<Command<unknown>, void>(executors);
	}

	async dispatch(command: Command<unknown>): Promise<void> {
		return this.executor.run(command, async () => {
			const handler = this.commandHandlersMapper.search(command);
			await handler.handle(command);
		})
	}
}
