export class OutDirNotDirectoryError extends Error {
	constructor(outDir: string) {
		super(`OutDir ${outDir} not directory.`);
	}
}
