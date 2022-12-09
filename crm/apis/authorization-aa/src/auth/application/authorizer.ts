import { EventAttributes, EventName } from '@latency/domain';
import { Notation } from 'notation';

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

	filter(name: EventName, userPolicy: UserPolicy, result: object): object {
		const objectPolicy = PolicyFactory.createObject();
		const notate = Notation.create;
		const properties = [
			...(objectPolicy.attributes?.included ? objectPolicy.attributes.included! : ['*']),
			...(objectPolicy.attributes?.excluded ? objectPolicy.attributes.excluded!.map((attribute) => `!${attribute}`) : []),
		];
		if (Array.isArray(result)) {
			return result.map((element) => notate(element).filter(properties).value)
		}
		return notate(result).filter(properties).value;
	}

	filterAttributes(attributes: EventAttributes<unknown>, eventName: EventName) {
		const objectPolicy = PolicyFactory.createObject();
		const notate = Notation.create;
		const properties = [
			...(objectPolicy.attributes?.included ? objectPolicy.attributes.included! : ['*']),
			...(objectPolicy.attributes?.excluded ? objectPolicy.attributes.excluded!.map((attribute) => `!${attribute}`) : []),
		];
		return new EventAttributes(notate(attributes.value).filter(properties).value);
	}
}
