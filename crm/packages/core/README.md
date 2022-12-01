# 💭 @latency/core

All core functions and utilities shared across all packages.



---

## ⚙️ How to Install

```bash
npm install @latency/core
```

---

## 👀 How to use

We only need to extend of class that need.

### `Adapter`
Adapt objects between types.
```tsx
import { Adapter } from '@latency/core';
import User from '../user';
import UserDto from './user.dto';

export const UserDtoAdapter = Adapter<User, UserDto>((user) => ({
	id: user.id.value,
	name: user.name.value,
	roleId: user.roleId.value,
}))
```

### `assertNever`
Preserve enum types on switches.
```tsx
switch (type) {
	case Vehicle.CAR:
    	...
		break;
	case Vehicle.MOTO:
    	...
		break;
	default:
    	assertNever(type)
}
```

### `isNullOrUndefined`
```tsx
const a = undefined;

isNullOrUndefined(a)
```

### `Optional`
Set property like value or `undefined`.
```tsx
export class User {
	constructor(
    	readonly id: number,
		readonly name: Optional<string>,
	) {
	}
}
```

### `PrimitiveType`
Define Typescript primitive types.
```tsx
type NewType = PrimitiveType;
```

### `Primitives<T>`
Extract all properties of class and convert to type with all values like a primitives.

Note: each property should be public. In other case, it not detects properties.
```tsx
import { PrimitiveType } from '@latency/core';

type property = PrimitiveType;

const userPrimitives: Primitives<User> = {
	id: '',
	name: '',
}
```

### `Logger`
Interface to share common interface methods:
- `log`
- `debug`
- `error`
```tsx
const logger = new SystemLogger()
```


