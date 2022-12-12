import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { TypeormDatasourceFactory } from '@latency/typeorm';
import { DataSource } from 'typeorm';

import { InversifyExpressAppContainer } from './inversify-express.app-container';
import TypeormExpressEnv from './inversify-express.env';
import { AppContainer } from './shared/container/app-container';
import { ApiModuleDefinition } from './shared/module/api.module';
import { SystemLogger } from './shared/system.logger';
import { UserModule } from './user/user.module';

export const AppModule: ApiModuleDefinition = {
	imports: [UserModule],
	entities: [],
	providers: [
		{ provide: Logger, useClass: SystemLogger },
		{ provide: Env, useValue: new TypeormExpressEnv() },
		{
			provide: DataSource,
			useFactory: (appContainer: AppContainer) => {
				return TypeormDatasourceFactory.create(
					appContainer.get(Env),
					(appContainer as InversifyExpressAppContainer).getTypeOrmEntities(),
				)
			},
		},
	],
	controllers: [],
}
