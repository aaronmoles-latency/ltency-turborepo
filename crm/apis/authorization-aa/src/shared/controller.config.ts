import { HttpMethod } from './http-method';

export default interface ControllerConfig {
	path: string,
	method: HttpMethod,
}
