import { ObjectPolicy, UserPolicy } from './policy';

// TODO Remove, only to PoC purpose
export default class PolicyFactory {
	static createUser(): UserPolicy {
		return ({
			id: ['0001'],
			role: ['admin', 'user'],
			city: ['VAL', 'MAD'],
			charge: ['LEAD'],
		})
	}

	static createObject(): ObjectPolicy {
		return ({
			dimensions: {
				role: ['admin', 'user'],
				city: ['MAD'],
			},
			attributes: {
				included: ['id', 'name', 'alias'],
				excluded: ['fee'],
			},
		})
	}
}
