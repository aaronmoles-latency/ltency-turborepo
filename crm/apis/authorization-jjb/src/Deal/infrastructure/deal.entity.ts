/* eslint-disable camelcase */
import { TypeormEntity } from '@latency/typeorm';
import { Column, Entity } from 'typeorm';

import { Deal } from '../domain/Deal';

@Entity('deal')
export default class DealEntity extends TypeormEntity<Deal> {
	@Column({ unique: true, length: 36, name: 'key' })
	private readonly id: string

	@Column()
	private readonly name: string

	@Column()
	private readonly fee: number

	constructor(id: string, name: string, fee: number){
		super();
		this.id=id;
		this.name=name;
		this.fee=fee;
	}

	toModel(): Deal {
		return new Deal(this.id, this.name, this.fee);
	}

	static from(deal: Deal) {
		return new DealEntity(deal.id, deal.name, deal.fee);
	}
}
