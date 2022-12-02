import { EnvType } from '@latency/env';

export interface TypeormConfigEnv extends EnvType {
	DB_URL: string,
}
