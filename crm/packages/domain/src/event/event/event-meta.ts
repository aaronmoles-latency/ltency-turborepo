import { PrimitiveType } from '../../core';

export type EventMetaKey = 'requestId'|'correlationId'|'replyTo'|'originUserId'|string;

export type EventMetaType = Record<EventMetaKey, PrimitiveType>

export class EventMeta {
	static empty() {
		return new EventMeta();
	}

	constructor(private readonly value: EventMetaType = {}) {
	}

	set(key: keyof EventMetaType, value: EventMetaType[keyof EventMetaType]): void {
		this.value[key] = value;
	}

	get(key: keyof EventMetaType): EventMetaType[keyof EventMetaType] {
		return this.value[key];
	}
}
