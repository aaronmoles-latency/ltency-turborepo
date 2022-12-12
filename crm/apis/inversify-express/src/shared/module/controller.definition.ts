import { NewableClass } from '@latency/core';

import { HttpMethod } from '../http-method';

export type ControllerDefinition = {
	controller: NewableClass<unknown>,
	path: string,
	method: HttpMethod,
}
