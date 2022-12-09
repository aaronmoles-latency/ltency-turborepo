#!/usr/bin/event node
/* eslint-disable @typescript-eslint/no-var-requires */

const { esbuildPluginDecorator } = require('esbuild-plugin-decorator');

require('esbuild')
	.build({
		entryPoints: ['./src/index.ts'],
		bundle: true,
		outfile: './dist/index.js',
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
		],
	})
	.catch(() => process.exit(1));
