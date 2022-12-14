export type EnvType = {
	NODE_ENV: string,
}

export abstract class Env<E extends EnvType> {
	abstract get(key: keyof E): E[keyof E];

	abstract set(key: keyof E, value: E[keyof E]): void;

	abstract isTestEnv(): boolean;
}
