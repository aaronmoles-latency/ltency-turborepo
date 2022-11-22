import { Request, Response } from 'express';
import { GetController } from '../../../shared/decorators/controller.decorator';
import AuthService from '../../application/auth.service';
import Controller from '../../../shared/controller';

@GetController('/auth')
export default class AuthController implements Controller {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const result = await this.authService.run()
        res.json({ data: result });
    }
}
