import {Request, Response} from "express";
import {GetController} from "../shared/decorators/controller.decorator";
import UserService from "./user.service";
import Controller from "../shared/controller";

@GetController('/user')
export default class UserController implements Controller {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const result = await this.userService.run()
        res.json({data: result});
    }
}
