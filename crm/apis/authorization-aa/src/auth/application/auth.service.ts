import AuthQuery from '../domain/auth.query';
import Policy from '../domain/policy';

export default class AuthService {
	async execute(query: AuthQuery): Promise<Policy> {
		switch (query.action.getVerb()){
			case 'list':
				return ({
					result: 'GRANT',
					attributes: {
						excluded: ['fee'],
					},
				})
			case 'detail':
				return ({
					result: 'DENY',
				})
			case 'create':
				return ({
					result: 'GRANT',
					attributes: {
						included: ['name', 'alias'],
					},
				})
			default:
				return ({
					result: 'DENY',
				})
		}
	}
}
