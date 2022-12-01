# ✉️ env

Manage enviroment variables with simply mechanism.

---

## ⚙️ How to Install

```bash
npm install @latency/env
```

---

## 👀 How to use

We have to use a `DotEnv` or `process` Implementation.

<aside>
⚠️ If we defined a var that after init object is not defined. It would throws a new Exception.

</aside>

### `ProcessEnv`

Import env vars from `process.env.XXXX`. This options is useful on production environments.

```tsx
import { ProcessEnv } from '@latency/env';
import { ServerEnvType } from '@latency/express-server';

export interface TypeOrmExpressEnv extends ServerEnvType {
	CUSTOM_VAR: string,
	OPTIONAL_VAR?: string,
}

export default class TypeormExpressEnv extends ProcessEnv<TypeOrmExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			CUSTOM_VAR: '',
	}
}
```

### `**DotEnv**`

Import all env vars from `.env.{NODE_ENV}` file.

This type extends of `ProcessEnv`.

```tsx
import { DotEnv } from '@latency/env';
import { ServerEnvType } from '@latency/express-server';

export interface TypeOrmExpressEnv extends ServerEnvType {
	CUSTOM_VAR: string,
	OPTIONAL_VAR?: string,
}

export default class TypeormExpressEnv extends DotEnv<TypeOrmExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			CUSTOM_VAR: '',
	}
}
```

## 🔁 Dependencies
