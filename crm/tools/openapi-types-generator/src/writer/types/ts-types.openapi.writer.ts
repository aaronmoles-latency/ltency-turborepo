import fs from 'fs';
import { OpenAPIV3_1 } from 'openapi-types';
import path from 'path';

import { Document } from '../../domain';
import { OutDirNotDirectoryError } from '../../errors/out-dir-not-directory.error';
import { OutDirNotFoundError } from '../../errors/out-dir-not-found.error';
import { NameGenerator } from '../name.generator';
import { Writer, WriterConfig } from '../writer';
import { TsTypesGenerator } from './ts-types.generator';

export class TsTypesOpenapiWriter implements Writer {
	private readonly FILE_NAME = 'types.ts';

	private readonly DEFAULT_FILE_CONTENT = '/* eslint-disable no-use-before-define */\n';

	private readonly tsTypesGenerator: TsTypesGenerator;

	private readonly nameGenerator: NameGenerator;

	constructor(private readonly config: WriterConfig) {
		const { outDir } = config;
		if (!fs.existsSync(outDir)) {
			throw new OutDirNotFoundError(outDir)
		}
		if (!fs.lstatSync(outDir).isDirectory()) {
			throw new OutDirNotDirectoryError(outDir)
		}

		this.tsTypesGenerator = new TsTypesGenerator()
		this.nameGenerator = new NameGenerator()
	}

	async write(document: Document): Promise<void> {
		const outFile = path.resolve(this.config.outDir, this.FILE_NAME);

		fs.writeFileSync(outFile, this.DEFAULT_FILE_CONTENT)
		const schemas = document.schemas;
		const parameters: Record<string, OpenAPIV3_1.ParameterObject[]> = {};

		document.routes.forEach(({ id, requestBody, responseBodies, pathParams, queryParams }) => {
			if (requestBody) {
				schemas[this.nameGenerator.requestBody(id)] = requestBody
			}
			if (responseBodies) {
				Object.keys(responseBodies).forEach((responseCode) => {
					schemas[this.nameGenerator.response(id, responseCode)] = responseBodies[responseCode]
				})
			}
			if (pathParams) {
				parameters[this.nameGenerator.pathParams(id)] = pathParams;
			}
			if (queryParams) {
				parameters[this.nameGenerator.queryParams(id)] = queryParams;
			}
		})

		Object.keys(schemas).forEach((schemaName) => {
			fs.appendFileSync(outFile, this.tsTypesGenerator.generateSchema(schemaName, schemas[schemaName]))
		})
		Object.keys(parameters).forEach((paramName) => {
			fs.appendFileSync(outFile, this.tsTypesGenerator.generateParam(paramName, parameters[paramName]))
		})
	}
}
