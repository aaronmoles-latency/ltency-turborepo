import { Env, EnvType } from './env';

export abstract class BaseEnv<K extends EnvType> implements Env<K> {
	private readonly env: K;

	protected constructor(env: K) {
		this.env = env;
	}

	public get(key: keyof K): K[keyof K] {
		return this.env[key];
	}

	public set(key: keyof K, value: K[keyof K]) {
		this.env[key] = value;
	}

	public isTestEnv() {
		return this.env['NODE_ENV'] === 'test';
	}
}
