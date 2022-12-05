import { StringValueObject } from '@latency/domain';

import { ActionType } from './action-type';

/**
 *  Action is composed by the next parts:
 * - Company name
 * - Service
 * - Type (command or query)
 * - Entity
 * - Verb
 *
 * Every part is separated by dots (.). Then the name always are composed by 5 strings.
 */
export class AuthAction extends StringValueObject {
	private static COMPANY_NAME = 'latency';

	static fromString(pattern: string): AuthAction {
		return new AuthAction(pattern);
	}

	private static create(
		service: string,
		type: ActionType,
		entity: string,
		verb: string,
	): AuthAction {
		return new AuthAction(
			`${this.COMPANY_NAME}.${service}.${type}.${entity}.${verb}`,
		);
	}

	private constructor(value: string) {
		super(value);
	}

	getVerb() {
		const verb = this.value.split('.')[4];
		if (!verb) {
			throw new Error(`Action verb <${this.value}> has a invalid format`);
		}
		return verb;
	}
}
