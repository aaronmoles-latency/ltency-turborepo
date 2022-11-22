import {Request, Response} from "express";
import {GetController} from "../shared/decorators/controller.decorator";
import DashboardService from "./dashboard.service";
import Controller from "../shared/controller";

@GetController('/dashboard')
export default class DashboardController implements Controller {
    constructor(
        private readonly dashboardService: DashboardService,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const result = await this.dashboardService.run()
        res.json({data: result});
    }
}
