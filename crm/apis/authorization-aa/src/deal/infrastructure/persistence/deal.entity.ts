import { TypeormEntity } from '@latency/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import Deal from '../../domain/deal';
import DealAlias from '../../domain/deal-alias';
import DealFee from '../../domain/deal-fee';
import DealId from '../../domain/deal-id';
import DealName from '../../domain/deal-name';

@Entity('deal')
export class DealEntity extends TypeormEntity<Deal> {
	@PrimaryColumn('uuid')
	readonly id: string;

	@Column()
	readonly name: string;

	@Column()
	readonly alias: string;

	@Column()
	readonly fee: number;

	static fromDeal(deal: Deal): DealEntity {
		return new DealEntity(
			deal.id.value,
			deal.name.value,
			deal.alias.value,
			deal.fee.value,
		)
	}

	constructor(
		id: string,
		name: string,
		alias: string,
		fee: number,
	) {
		super();
		this.id = id;
		this.name = name;
		this.alias = alias;
		this.fee = fee;
	}

	toModel(): Deal {
		return new Deal(
			new DealId(this.id),
			new DealName(this.name),
			new DealAlias(this.alias),
			new DealFee(this.fee),
		);
	}
}
