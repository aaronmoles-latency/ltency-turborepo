/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from 'dotenv';

import { EnvType } from './Env';
import ProcessEnv from './ProcessEnv';

export default abstract class DotEnv<K extends EnvType> extends ProcessEnv<K> {
	protected constructor(variables: K) {
		dotenv.config();

		super(variables);
	}
}
