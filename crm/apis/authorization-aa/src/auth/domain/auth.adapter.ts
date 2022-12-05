import { Adapter } from '@latency/core';

import Policy from './policy';

export const authAdapter = <T extends object>(policy: Policy) => Adapter<T, T>((object) => {
	Object.keys(object).forEach((key) => {
		if (policy.attributes) {
			if ((policy.attributes.included && !policy.attributes.included.includes(key)) ||
				(policy.attributes.excluded && policy.attributes.excluded.includes(key))) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				delete object[key]
			}
		}
	})
	return object;
})
