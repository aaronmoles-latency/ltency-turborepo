import {ContainerBuilder} from "diod";
import {DiTag} from "../shared/di/di-tag";
import {Module} from "../shared/module";
import AuthController from "./infrastructure/controller/auth.controller";
import AuthService from "./application/auth.service";
import RegisterController from "./infrastructure/controller/register.controller";
import RegisterService from "./application/register.service";
import {AuthRepository} from "./domain/auth.repository";
import MongoAuthRepository from "./infrastructure/repository/mongo.auth.repository";

export default class AuthModule extends Module {
    register(builder: ContainerBuilder): void {
        builder.registerAndUse(AuthController).addTag(DiTag.CONTROLLER)
        builder.registerAndUse(RegisterController).addTag(DiTag.CONTROLLER)
        builder.registerAndUse(AuthService)
        builder.registerAndUse(RegisterService)
        builder.register(AuthRepository).use(MongoAuthRepository)
    }
}
