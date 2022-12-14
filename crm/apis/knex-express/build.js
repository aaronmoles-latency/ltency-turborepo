#!/usr/bin/event node
/* eslint-disable @typescript-eslint/no-var-requires */

const { esbuildPluginDecorator } = require('esbuild-plugin-decorator');
const { readdirSync } = require('fs');

const migrations = readdirSync('migrations')
	.filter((src) => src.endsWith('.ts'))
	.map((src) => `./migrations/${src}`)

require('esbuild')
	.build({
		entryPoints: ['./src/index.ts', ...migrations],
		bundle: true,
		outdir: './dist',
		tsconfig: './tsconfig.json',
		platform: 'node',
		minify: false,
		plugins: [
			esbuildPluginDecorator({
				tsconfigPath: 'tsconfig.json',
			}),
		],
		external: [
			'pg-native',
			'pg-query-stream',
			'mysql',
			'mysql2',
			'oracledb',
			'tedious',
			'sqlite3',
			'better-sqlite3',
		],
	})
	.catch(() => process.exit(1));
