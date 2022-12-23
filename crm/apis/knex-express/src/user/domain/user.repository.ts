import { QueryObject } from './query-objects/QueryObject';
import User from './user';

export abstract class UserRepository {
	abstract save(user: User): Promise<void>;

	abstract findAll(): Promise<User[]>;

	abstract rawQuery<T>(queryObject: QueryObject): Promise<T>;
}
