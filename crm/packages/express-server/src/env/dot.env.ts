import dotenv from 'dotenv';
import * as path from 'path';

import { EnvType } from './env';
import { ProcessEnv } from './process.env';

export abstract class DotEnv<K extends EnvType> extends ProcessEnv<K> {
	protected constructor(variables: K) {
		dotenv.config({
			// eslint-disable-next-line turbo/no-undeclared-env-vars
			path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV ?? 'dev'}`),
		});

		super(variables)
	}
}
