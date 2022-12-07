import { Query } from '../cqrs/domain/query/query';
import { Command } from './command';

interface Service<Req, Res> {
	execute: (param: Req) => Promise<Res>
}

export type CommandService<Req extends Command> = Service<Req, void>;

export type QueryService<Req extends Query, Res> = Service<Req, Res>;
