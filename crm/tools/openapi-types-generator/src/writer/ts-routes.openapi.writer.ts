import fs from 'fs';
import path from 'path';

import { Document } from '../domain';
import { OutDirNotDirectoryError } from '../errors/out-dir-not-directory.error';
import { OutDirNotFoundError } from '../errors/out-dir-not-found.error';
import { TsRoutesGenerator } from '../generators/ts-routes.generator';
import { Writer, WriterConfig } from './writer';

export class TsRoutesOpenapiWriter implements Writer {
	private readonly FILE_NAME = 'routes.ts';

	private readonly DEFAULT_FILE_CONTENT = '';

	private readonly tsRoutesGenerator: TsRoutesGenerator;

	constructor(private readonly config: WriterConfig) {
		const { outDir } = config;
		if (!fs.existsSync(outDir)) {
			throw new OutDirNotFoundError(outDir)
		}
		if (!fs.lstatSync(outDir).isDirectory()) {
			throw new OutDirNotDirectoryError(outDir)
		}

		this.tsRoutesGenerator = new TsRoutesGenerator()
	}

	async write({ routes }: Document): Promise<void> {
		const outFile = path.resolve(this.config.outDir, this.FILE_NAME);
		fs.writeFileSync(outFile, this.DEFAULT_FILE_CONTENT)

		fs.appendFileSync(outFile, this.tsRoutesGenerator.generateRoutes(routes))
	}
}
