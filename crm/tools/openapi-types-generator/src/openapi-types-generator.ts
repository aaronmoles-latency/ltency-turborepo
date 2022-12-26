import { Document } from './domain';
import { OpenapiParser, OpenapiParserConfig } from './parser/openapi.parser';
import { TsControllerOpenapiWriter } from './writer/controller/ts-controller.openapi.writer';
import { TsRoutesOpenapiWriter } from './writer/routes/ts-routes.openapi.writer';
import {
	TsTypesOpenapiWriter,
} from './writer/types/ts-types.openapi.writer';
import { Writer, WriterConfig } from './writer/writer';

type Config = WriterConfig & OpenapiParserConfig

export class OpenapiTypesGenerator {
	private readonly parser: OpenapiParser;

	private readonly writers: Writer[];

	constructor(private readonly config: Config) {
		const { sourceFile, outDir } = config;
		this.parser = new OpenapiParser({ sourceFile })
		this.writers = [
			new TsTypesOpenapiWriter({ outDir }),
			new TsRoutesOpenapiWriter({ outDir }),
			new TsControllerOpenapiWriter({ outDir }),
		]
	}

	public async generate(): Promise<void> {
		const document: Document = await this.parser.parseDocument()
		this.writers.map((writer) => writer.write(document))
	}
}
