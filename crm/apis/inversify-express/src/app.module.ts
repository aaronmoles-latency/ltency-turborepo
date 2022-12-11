import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { TypeormDatasourceFactory } from '@latency/typeorm';
import { DataSource } from 'typeorm';

import TypeormExpressEnv from './inversify-express.env';
import { RoleEntity } from './role/infrastructure/persistence/role.entity';
import { AppContainer } from './shared/container/app-container';
import { ApiModule } from './shared/module/api.module';
import { SystemLogger } from './shared/system.logger';
import UserEntity from './user/infrastructure/persistence/user.entity';
import { UserModule } from './user/user.module';

export const AppModule: ApiModule = {
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
					[UserEntity, RoleEntity],
				)
			},
		},
	],
	controllers: [],
}
