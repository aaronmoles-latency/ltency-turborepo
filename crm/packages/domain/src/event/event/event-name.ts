import { StringValueObject } from '../../value-object';
import { EventType } from './event-type';

/**
 *  Name it composed by the next parts:
 * - Company name
 * - Service
 * - Version
 * - Type (application-event, domain-event, event, command or query)
 * - Entity
 * - Name
 *
 * Every part is separated by dots (.). Then the name always are composed by 6 strings.
 */
export class EventName extends StringValueObject {
	private static COMPANY_NAME = 'latency';

	static fromString(pattern: string): EventName {
		return new EventName(pattern);
	}

	private static create(
		service: string,
		type: EventType,
		entity: string,
		name: string,
		version = 1,
	): EventName {
		return new EventName(
			`${this.COMPANY_NAME}.${service}.${version}.${type}.${entity}.${name}`,
		);
	}

	static domainEvent(
		service: string,
		entity: string,
		name: string,
		version?: number,
	): EventName {
		return this.create(service, EventType.DOMAIN_EVENT, entity, name, version)
	}

	static query(
		service: string,
		entity: string,
		name: string,
		version?: number,
	): EventName {
		return this.create(service, EventType.QUERY, entity, name, version)
	}

	static command(
		service: string,
		entity: string,
		name: string,
		version?: number,
	): EventName {
		return this.create(service, EventType.COMMAND, entity, name, version)
	}

	private constructor(value: string) {
		super(value);
	}

	public getType(): EventType {
		return this.getIndexValue(3) as EventType;
	}

	public getService(): string {
		return this.getIndexValue(1);
	}

	public getEntity(): string {
		return this.getIndexValue(4);
	}

	public getIndexValue(index: number): string {
		const value = this.value.split('.')[index];
		if (!value) {
			throw new Error(`Event service <${this.value}> has a invalid format`);
		}
		return value;
	}
}
