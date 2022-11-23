/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from 'dotenv';

import { EnvType } from './env';
import { ProcessEnv } from './process.env';

export abstract class DotEnv<K extends EnvType> extends ProcessEnv<K> {
	protected constructor(variables: K) {
		dotenv.config();

		super(variables)
	}
}
