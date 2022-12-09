import { AggregateRoot } from '@latency/domain';

export class Deal extends AggregateRoot{
	constructor(private readonly _id: string, private readonly _name: string, private readonly _fee: number){
		super();
	}

	get name(){
		return this._name;
	}

	get id(){
		return this._id;
	}

	get fee(){
		return this._fee;
	}
}
