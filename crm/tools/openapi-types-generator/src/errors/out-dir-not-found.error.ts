export class OutDirNotFoundError extends Error {
	constructor(outDir: string) {
		super(`OutDir ${outDir} not found.`);
	}
}
