# 💭 @latency/domain

All domain objects needed to start to develop your project.
This package contains base to your **Value Objects**, **Aggregate Root**, **Domain Events** and more.

---

## ⚙️ How to Install

```bash
npm install @latency/domain
```

---

## 👀 How to use

We only need to extend of class that need.

### Value Object
```tsx
import { StringValueObject } from '@latency/domain';

class NameValueObject extends StringValueObject {

}
```

### Uuid Value Object
```tsx
import { Uuid } from '@latency/domain';

class UuidValueObject extends Uuid {

}
```

### Enumeration Value Object
```tsx
import { EnumValueObject, InvalidArgumentError } from '@latency/domain';

enum Vehicle {
	CAR = 'CAR',
	MOTO = 'MOTO',
	BIKE = 'BIKE',
}

class VehicleValueObject extends EnumValueObject<Vehicle> {
	constructor(value: Vehicle) {
		super(value, Object.values(Vehicle));
	}

	protected throwErrorForInvalidValue(value: Vehicle): void {
		throw new InvalidArgumentError(`${value} is not valid value to ${this.constructor.name}`)
	}
}
```

### Aggregate Root
```tsx
import { AggregateRoot } from '@latency/domain';

import RoleId from '../../role/domain/role-id';
import UserId from './value-object/user-id';
import UserName from './value-object/user-name';

export default class User extends AggregateRoot {
	constructor(
		private readonly _id: UserId,
		private readonly _name: UserName,
		private readonly _roleId: RoleId,
	) {
		super()
	}
}
```

### Domain Event

```tsx
class UserCreatedDomainEvent extends DomainEvent<Primitives<User>> {
	constructor(aggregateId: Uuid, attributes: Primitives<User>) {
		super(
			EventName.domainEvent('test', 'user', 'created'),
			aggregateId,
			attributes,
		);
	}
}
```

---

## 🔁 Dependencies
