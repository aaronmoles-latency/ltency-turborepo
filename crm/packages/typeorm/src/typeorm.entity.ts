import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TypeormEntity<T> {
	@CreateDateColumn({
		type: 'timestamp without time zone',
		name: 'created_at',
	})
	protected readonly createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamp without time zone',
		name: 'updated_at',
	})
	protected readonly updatedAt!: Date;

	// @BeforeInsert()
	// private beforeInsert() {
	// 	if (!this.createdAt) {
	// 		this.createdAt = new Date();
	// 	}
	// 	this.beforeUpdate();
	// }
	//
	// @BeforeUpdate()
	// private beforeUpdate() {
	// 	this.updatedAt = new Date();
	// }

	abstract toModel(): T
}
