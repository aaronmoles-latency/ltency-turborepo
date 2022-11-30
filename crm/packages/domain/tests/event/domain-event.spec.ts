// eslint-disable-next-line max-classes-per-file
import { DomainEvent, EventName, Primitives, Uuid } from '../../src';

class User {
	constructor(
		readonly id: string,
		readonly name: string,
	) {
	}
}

class UserCreatedDomainEvent extends DomainEvent<Primitives<User>> {
	constructor(aggregateId: Uuid, attributes: Primitives<User>) {
		super(
			EventName.domainEvent('test', 'user', 'created'),
			aggregateId,
			attributes,
		);
	}
}

describe('DomainEvent', () => {
	it('should create new domain event', () => {
		const domainEvent = new UserCreatedDomainEvent(
			Uuid.random(),
			{
				id: '',
				name: '',
			},
		)

		expect(domainEvent).toBeDefined()
	})
});
