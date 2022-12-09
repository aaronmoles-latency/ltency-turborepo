import { AggregateRoot } from '@latency/domain';

import { Operation } from '../../shared/Operation';

type Permissions = {
	allow?: string[],
	disallow?: string[]
}

export class Policy extends AggregateRoot{
	constructor(private readonly _granted: boolean, private readonly _permissions: {
		[key in Operation]: Permissions
	}){
		super();
	}

	static allForbidden() {
		return new Policy(false, { [Operation.CREATE]: {
			disallow: ['*'],
		}, [Operation.UPDATE]: {
			disallow: ['*'],
		}, [Operation.READ]: {
			disallow: ['*'],
		}, [Operation.DELETE]: {
			disallow: ['*'],
		} })
	}

	static allAllowed() {
		return new Policy(true, { [Operation.CREATE]: {
			allow: ['*'],
		}, [Operation.UPDATE]: {
			allow: ['*'],
		}, [Operation.READ]: {
			allow: ['*'],
		}, [Operation.DELETE]: {
			allow: ['*'],
		} })
	}

	grantedFor(operation: Operation){
		return this._granted === true && this._permissions[operation].allow?.[0] === '*';
	}

	columnsGranted(operation: Operation, columns: any[]){
		if (!this._granted){
			return []
		}
		const permissions = this._permissions[operation];
		const granted = permissions.disallow?.includes('*') ? [] : permissions.allow?.includes('*') ? [...columns.filter((c) => !permissions.disallow?.includes(c))] : columns?.filter((c) => permissions.allow?.includes(c))

		return granted
	}
}
