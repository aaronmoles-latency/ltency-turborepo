import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { OutDirNotDirectoryError } from './errors/out-dir-not-directory.error';
import { OutDirNotFoundError } from './errors/out-dir-not-found.error';
import { SourceFileNotFoundError } from './errors/source-file-not-found.error';
import { OpenapiTypesGenerator } from './openapi-types-generator';

describe('OpenapiTypesGenerator', () => {
	const sourceFile = path.resolve(__dirname, '../example.openapi.yaml');
	const outDir = path.resolve(process.cwd(), 'tmp');
	const outTypesPath = path.resolve(outDir, 'types.ts');
	const outRoutesPath = path.resolve(outDir, 'routes.ts');
	const outControllerPath = path.resolve(outDir, 'controllers.ts');

	it('create instance', () => {
		new OpenapiTypesGenerator({
			sourceFile,
			outDir,
		})
	})

	it('throw new SourceFileNotFoundError if source file not found', () => {
		expect(() => new OpenapiTypesGenerator({
			sourceFile: path.resolve(__dirname, '../example.yaml'),
			outDir,
		})).toThrow(SourceFileNotFoundError)
	})

	it('throw new OutDirNotFoundError if outDir is not directory', () => {
		expect(() => new OpenapiTypesGenerator({
			sourceFile,
			outDir: path.resolve(__dirname, 'not-exist'),
		})).toThrow(OutDirNotFoundError)
	})

	it('throw new OutDirNotDirectoryError if outDir is not a directory', () => {
		expect(() => new OpenapiTypesGenerator({
			sourceFile,
			outDir: sourceFile,
		})).toThrow(OutDirNotDirectoryError)
	})

	it('generate out file types', async () => {
		if (fs.existsSync(outTypesPath)) {
			fs.unlinkSync(outTypesPath)
		}

		const generator = new OpenapiTypesGenerator({
			sourceFile,
			outDir,
		})
		await generator.generate();

		expect(fs.existsSync(outTypesPath)).toBeTruthy()
	})

	it('generate out file routes', async () => {
		if (fs.existsSync(outRoutesPath)) {
			fs.unlinkSync(outRoutesPath)
		}

		const generator = new OpenapiTypesGenerator({
			sourceFile,
			outDir,
		})
		await generator.generate();

		expect(fs.existsSync(outRoutesPath)).toBeTruthy()
	})

	it('generate out file controller', async () => {
		if (fs.existsSync(outControllerPath)) {
			fs.unlinkSync(outControllerPath)
		}

		const generator = new OpenapiTypesGenerator({
			sourceFile,
			outDir,
		})
		await generator.generate();

		expect(fs.existsSync(outControllerPath)).toBeTruthy()
	})
});
