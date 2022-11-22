import { HttpMethod } from '../http-method';
import ControllerConfig from '../controller.config';

export const controllers: Map<string, ControllerConfig> = new Map();

export const GetController = (path: string): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        controllers.set(target.name, { method: HttpMethod.GET, path })
        return target
    }
}

export const PostController = (path: string): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        controllers.set(target.name, { method: HttpMethod.POST, path })
        return target
    }
}

export const PutController = (path: string): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        controllers.set(target.name, { method: HttpMethod.PUT, path })
        return target
    }
}

export const DeleteController = (path: string): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        controllers.set(target.name, { method: HttpMethod.DELETE, path })
        return target
    }
}
