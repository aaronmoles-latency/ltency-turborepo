/* eslint-disable turbo/no-undeclared-env-vars,@typescript-eslint/no-var-requires */
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

module.exports = {
	client: 'pg',
	connection: process.env.DB_URL,
	migrations: {
		directory: './migrations',
		disableMigrationsListValidation: true,
		tableName: 'migration',
		extension: 'ts',
		loadExtensions: ['.ts'],
	},
	seeds: {
		directory: './fixtures',
		extension: 'ts',
		loadExtensions: ['.ts'],
	},
};
