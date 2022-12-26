import fs from 'fs';
import path from 'path';

import { Document } from '../../domain';
import { OutDirNotDirectoryError } from '../../errors/out-dir-not-directory.error';
import { OutDirNotFoundError } from '../../errors/out-dir-not-found.error';
import { Writer, WriterConfig } from '../writer';
import { TsControllerGenerator } from './ts-controller.generator';

export class TsControllerOpenapiWriter implements Writer {
	private readonly FILE_NAME = 'controllers.ts';

	private readonly DEFAULT_FILE_CONTENT = `/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';

`;

	private readonly tsControllerGenerator: TsControllerGenerator;

	constructor(private readonly config: WriterConfig) {
		const { outDir } = config;
		if (!fs.existsSync(outDir)) {
			throw new OutDirNotFoundError(outDir)
		}
		if (!fs.lstatSync(outDir).isDirectory()) {
			throw new OutDirNotDirectoryError(outDir)
		}

		this.tsControllerGenerator = new TsControllerGenerator()
	}

	async write({ routes }: Document): Promise<void> {
		const outFile = path.resolve(this.config.outDir, this.FILE_NAME);
		fs.writeFileSync(outFile, this.DEFAULT_FILE_CONTENT)
		fs.appendFileSync(outFile, this.tsControllerGenerator.generateImports(routes))
		fs.appendFileSync(outFile, this.tsControllerGenerator.controllerInterface())
		fs.appendFileSync(outFile, this.tsControllerGenerator.generateControllers(routes))
	}
}
