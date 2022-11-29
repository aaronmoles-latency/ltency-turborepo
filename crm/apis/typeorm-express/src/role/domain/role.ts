import { AggregateRoot } from '../../shared/domain/aggregate-root';

export default class Role extends AggregateRoot {
	constructor(
		private readonly id: string,
		private readonly name: string,
	) {
		super();
	}
}
