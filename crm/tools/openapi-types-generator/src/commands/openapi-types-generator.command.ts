import yargs from 'yargs';

import { OpenapiTypesGenerator } from '../openapi-types-generator';

export class OpenapiTypesGeneratorCommand implements yargs.CommandModule {
	command = 'generate:types'

	describe = 'Generate Typescript from OpenAPI definition.'

	builder(args: yargs.Argv) {
		return args
			.option('source-file', {
				alias: 's',
				describe: 'Path to OpenAPI source file.',
				demandOption: true,
			})
			.option('outDir', {
				alias: 'o',
				describe: 'Folder where generate types file.',
				demandOption: true,
			})
	}

	async handler(args: yargs.Arguments) {
		try {
			const openapiTypesGenerator = new OpenapiTypesGenerator({
				sourceFile: String(args.sourceFile),
				outDir: String(args.outDir),
			})
			await openapiTypesGenerator.generate()
		} catch (err) {
			process.exit(1)
		}
	}
}
