import ControllerConfig from '../controller.config';
import { HttpMethod } from '../http-method';
import { combineDecorators } from './combine-decorators';

export const controllers: Map<string, ControllerConfig> = new Map();

const HttpController = (path: string, method: HttpMethod): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		controllers.set(target.name, { method, path });
		return target;
	};
};

export const GetController = (path: string): ClassDecorator => {
	return combineDecorators(
		HttpController(path, HttpMethod.GET),
	);
};

export const PostController = (path: string): ClassDecorator => {
	return combineDecorators(
		HttpController(path, HttpMethod.POST),
	);
};

export const PutController = (path: string): ClassDecorator => {
	return combineDecorators(
		HttpController(path, HttpMethod.PUT),
	);
};

export const DeleteController = (path: string): ClassDecorator => {
	return combineDecorators(
		HttpController(path, HttpMethod.DELETE),
	);
};
