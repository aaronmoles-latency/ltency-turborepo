import { Event } from './event';

export abstract class ApplicationEvent<T = Record<string, never>> extends Event<T> {
}
