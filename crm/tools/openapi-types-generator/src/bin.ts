import yargs from 'yargs';

import { OpenapiTypesGeneratorCommand } from './commands/openapi-types-generator.command';

yargs
	.usage('Usage: $0 <command> [options]')
	.command(new OpenapiTypesGeneratorCommand())
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help').argv
