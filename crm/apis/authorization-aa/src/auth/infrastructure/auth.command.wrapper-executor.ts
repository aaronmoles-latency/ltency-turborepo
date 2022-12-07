import { Command } from '../../shared/cqrs/domain/command/command';
import WrapperExecutor from '../../shared/wrapper-executor';
import Authorizer from '../application/authorizer';
import AuthCommand from '../domain/auth.command';

export default class AuthCommandWrapperExecutor implements WrapperExecutor<Command, void>{
	constructor(
		private readonly authorizer: Authorizer,
	) {
	}

	async run(command: Command, next: () => Promise<void>): Promise<void> {
		if (command instanceof AuthCommand) {
			await this.authorizer.grant(command.__name, command.userPolicy)
		}
		return next();
	}
}
