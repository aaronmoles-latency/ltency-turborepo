import { Command } from '../../shared/cqrs/domain/command/command';
import WrapperExecutor from '../../shared/wrapper-executor';
import Authorizer from '../application/authorizer';
import AuthCommand from '../domain/auth.command';

export default class AuthCommandWrapperExecutor implements WrapperExecutor<Command<unknown>, void>{
	constructor(
		private readonly authorizer: Authorizer,
	) {
	}

	async run(command: Command<unknown>, next: () => Promise<void>): Promise<void> {
		if (command instanceof AuthCommand) {
			await this.authorizer.grant(command.name, command.userPolicy)
			command.updateAttributes(
				this.authorizer.filterAttributes(
					command.attributes,
					command.name,
				),
			)
		}
		return next();
	}
}
