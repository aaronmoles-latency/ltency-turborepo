import { Request, Response } from 'express';

export default interface Controller<Req extends Request = Request, Res extends Response = Response> {
	run(req: Req, res: Res): Promise<void>
}
