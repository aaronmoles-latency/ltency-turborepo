export class SourceFileNotFoundError extends Error {
	constructor(sourceFile: string) {
		super(`Source file ${sourceFile} not found.`);
	}
}
