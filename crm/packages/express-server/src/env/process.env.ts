import { BaseEnv } from './base.env';
import { EnvType } from './env';

export class ProcessEnv<K extends EnvType> extends BaseEnv<K> {
	protected constructor(variables: K) {
		super(variables)

		const envKeys = Object.keys(variables);

		for (const key of envKeys) {
			const value = process.env[key] as K[keyof K];

			// console.log('KEY', key, 'VALUE', value, super.get(key));
			if (value) {
				super.set(key as keyof K, value)
			} else if (!super.get(key as keyof K)) {
				// console.log(process.env.NODE_ENV);
				throw new Error(`Missing env key ${key}`);
			}
		}
	}
}
