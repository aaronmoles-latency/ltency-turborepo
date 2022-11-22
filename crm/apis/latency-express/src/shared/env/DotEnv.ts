/* eslint-disable @typescript-eslint/no-var-requires */
import { EnvType } from './Env';
import ProcessEnv from './ProcessEnv';
import dotenv from 'dotenv';

export default abstract class DotEnv<K extends EnvType> extends ProcessEnv<K> {
    protected constructor(variables: K) {
        dotenv.config();

        super(variables)
    }
}
