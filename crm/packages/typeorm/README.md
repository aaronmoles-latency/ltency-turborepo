# 🔥 typeorm

All core functions and utilities shared across all packages.

---

## ⚙️ How to Install

```bash
npm install @latency/typeorm reflect-metadata
```

---

## 👀 How to use

Add import it somewhere in the global place of your app (for example in `app.ts`):

```tsx
import "reflect-metadata"
```

## Data Source

To create `DataSource` ****we can create with all options or use a factory:

```tsx
import { DataSource, TypeormConfigEnv, TypeormDatasourceFactory } from '@latency/typeorm';

const env = container.get(Env<TypeormConfigEnv>)
const dataSource = TypeormDatasourceFactory.create(
	env,
	[UserEntity],
)
```

```tsx
import { DataSource } from '@latency/typeorm';

new DataSource({
	type: 'postgres',
	url: env.get('DB_URL'),
	synchronize: false,
	logging: false,
	[UserEntity],
	subscribers: [],
	migrations: ['migrations/**/*{.ts,.js}'],
	maxQueryExecutionTime: 1000,
	migrationsRun: true,
})
```

## Entities

Each entity need to extends of `TypeormEntity<T>`.

```tsx
/* eslint-disable camelcase */
import { TypeormEntity } from '@latency/typeorm';

@Entity('user')
class UserEntity extends TypeormEntity<User> {

	...

	toModel(): User {
		return new User(
			new UserId(this.id),
			new UserName(this.name),
			new RoleId(this.roleId),
		);
	}
}
```

## Repository

```tsx
class TypeormUserRepository extends TypeOrmRepository<User, UserEntity> {
	constructor(dataSource: DataSource) {
		super(dataSource, UserEntity)
	}

	async save(user: User): Promise<void> {
		await this.persist(UserEntity.fromUser(user))
	}

	findAll(): Promise<User[]> {
		return this.repository().find()
			.then((userEntities) => userEntities
				.map((userEntity) => userEntity.toModel()));
	}
}
```

## Migrations

To allow manage migrations we need to add next lines on package.json:

```json
"scripts": {
	"migration:check": "npx typeorm-ts-node-esm migration:generate migrations/check -d ./src/database.ts --check",
    "migration:generate": "npx typeorm-ts-node-esm migration:generate migrations/Migration -d ./src/database.ts",
    "migration:create": "npx typeorm-ts-node-esm migration:create migrations/ManualMigration -d ./src/database.ts",
    "migration:run": "npx typeorm-ts-node-esm migration:run -d ./src/database.ts",
    "migration:revert": "npx typeorm-ts-node-esm migration:revert -d ./src/database.ts"
}
```

## 🔁 Dependencies

[eslint-config-custom](https://www.notion.so/eslint-config-custom-b483643d30f549919d6e8f10eaffcda2)

[tsconfig](https://www.notion.so/tsconfig-8c5f350a5e68412a9e9b9783a25422ef)
