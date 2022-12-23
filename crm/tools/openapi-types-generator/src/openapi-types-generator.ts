import { Document } from './domain';
import { OpenapiParser, OpenapiParserConfig } from './parser/openapi.parser';
import {
	TsTypesOpenapiWriter,
} from './writer/ts-types.openapi.writer';
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
		]
	}

	public async generate(): Promise<void> {
		const document: Document = await this.parser.parseDocument()
		this.writers.map((writer) => writer.write(document))
	}
}
