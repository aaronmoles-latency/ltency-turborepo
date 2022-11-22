import {Service} from "../decorators/service.decorator";

export type EnvType = {
    NODE_ENV: string,
    PORT: string,
    [key: string]: string
}

export abstract class Env<E extends EnvType> {
    abstract get(key: keyof E): string;
    abstract set(key: keyof E, value: string): void;
}
