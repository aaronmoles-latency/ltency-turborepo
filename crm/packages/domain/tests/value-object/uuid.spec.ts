import { Uuid } from '../../src';

class UuidValueObject extends Uuid {

}

describe('Uuid', () => {
	it('should create a random uuid', () => {
		const uuid = UuidValueObject.random();

		expect(uuid).toBeDefined()
	})
})
