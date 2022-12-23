import { Document } from '../domain';

export type WriterConfig = {
	outDir: string,
}

export interface Writer {
	write(document: Document): Promise<void>
}
