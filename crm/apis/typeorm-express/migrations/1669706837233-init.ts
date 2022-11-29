import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1669706837233 implements MigrationInterface {
	name = 'init1669706837233'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "role" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))');
		await queryRunner.query('CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "role_id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "user"');
		await queryRunner.query('DROP TABLE "role"');
	}
}
