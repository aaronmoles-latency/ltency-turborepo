import { Service } from '../../shared/decorators/service.decorator';
import { Operation } from '../../shared/Operation';
import { Policy } from '../domain/Policy';

const policies: {[user: string]: {[domain: string]: Policy}} = {
	'user1': {
		'deal': new Policy(true, { [Operation.CREATE]: {
			allow: ['*'],
			disallow: ['fee'],
		}, [Operation.UPDATE]: {
			allow: ['*'],
		}, [Operation.READ]: {
			allow: ['*'],
			// resources: {
			// 	'*': {
			// 		allow: ['*'],
			// 		disallow: ['fee'],
			// 	},
			// 	'456': { // G1
			// 		allow: ['*'],
			//    disallow: ['fee']
			// 	},
			// 	'78': { // G2
			// 		allow: ['*']
			// 	},
			// 	'90': { // G3
			// 		allow: ['*']
			// 	}
			// }
		}, [Operation.DELETE]: {
			allow: ['*'],
		} }),
	},
	'user2': {
		'deal': Policy.allAllowed(),
	},
	'user3': {
		'deal': Policy.allForbidden(),
	},
}

@Service()
export class PolicyByUser {
	async run(userId: string, domain: string): Promise<Policy> {
		return policies[userId][domain];
	}
}
