import fs from 'fs';
import path from 'path';

import { Document } from '../domain';
import { OutDirNotDirectoryError } from '../errors/out-dir-not-directory.error';
import { OutDirNotFoundError } from '../errors/out-dir-not-found.error';
import { TsOpenapiGenerator } from '../generators/ts-openapi.generator';
import { Writer, WriterConfig } from './writer';

export class TsTypesOpenapiWriter implements Writer {
	private readonly FILE_NAME = 'types.ts';

	private readonly DEFAULT_FILE_CONTENT = '/* eslint-disable no-use-before-define */\n';

	private readonly tsOpenapiGenerator: TsOpenapiGenerator;

	constructor(private readonly config: WriterConfig) {
		const { outDir } = config;
		if (!fs.existsSync(outDir)) {
			throw new OutDirNotFoundError(outDir)
		}
		if (!fs.lstatSync(outDir).isDirectory()) {
			throw new OutDirNotDirectoryError(outDir)
		}

		this.tsOpenapiGenerator = new TsOpenapiGenerator()
	}

	async write(document: Document): Promise<void> {
		const outFile = path.resolve(this.config.outDir, this.FILE_NAME);
		fs.writeFileSync(outFile, this.DEFAULT_FILE_CONTENT)
		const schemas = {
			...document.schemas,
			...document.requestBodies,
		};
		Object.keys(schemas).forEach((schemaName) => {
			fs.appendFileSync(outFile, this.tsOpenapiGenerator.generateSchema(schemaName, schemas[schemaName]))
		})

		const parameters = {
			...document.pathParamsList,
			...document.queryParamsList,
		};
		Object.keys(parameters).forEach((paramName) => {
			fs.appendFileSync(outFile, this.tsOpenapiGenerator.generateParam(paramName, parameters[paramName]))
		})
	}
}
