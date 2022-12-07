import { EventName } from '@latency/domain';

import { AuthorizationError } from '../domain/authorization.error';
import { ObjectPolicy, UserPolicy } from '../domain/policy';
import PolicyFactory from '../domain/policy.factory';

export default class Authorizer {
	async grant(action: EventName, userPolicy: UserPolicy): Promise<void> {
		switch (action.getEntity()){
			case 'deal':
				this.checkDimensions(userPolicy, PolicyFactory.createObject())
				break;
			default:
				throw new AuthorizationError('Action not defined')
		}
	}

	private checkDimensions(userPolicy: UserPolicy, objectPolicy: ObjectPolicy) {
		Object.keys(objectPolicy.dimensions).forEach((dimension) => {
			if (!userPolicy[dimension]) {
				throw new AuthorizationError(`UserPolicy not exists dimension ${dimension}`)
			}
			objectPolicy.dimensions[dimension].forEach((dimensionValue) => {
				if (!userPolicy[dimension].some((userPolicyDimensionValue) => userPolicyDimensionValue === dimensionValue)) {
					throw new AuthorizationError(`UserPolicy not contains value ${dimensionValue} in dimension ${dimension}`)
				}
			})
		})
	}
}
