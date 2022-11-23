import { BaseEnv } from './base.env';
import { EnvType } from './env';

export class ProcessEnv<K extends EnvType> extends BaseEnv<K> {
	protected constructor(variables: K) {
		super(variables)

		const envKeys = Object.keys(variables);

		for (const key of envKeys) {
			const value = process.env[key];

			if (value) {
				super.set(key, value)
			} else if (!super.get(key)) {
				throw new Error(`Missing env key ${key}`);
			}
		}
	}
}
