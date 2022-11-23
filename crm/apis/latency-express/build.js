#!/usr/bin/env node

import esbuild from 'esbuild';
import {esbuildPluginDecorator} from 'esbuild-plugin-decorator';

esbuild.build({
	entryPoints: ['./src/index.ts'],
	bundle: true,
	outfile: './dist/index.js',
	tsconfig: './tsconfig.json',
	platform: 'node',
	minify: true,
	plugins: [
		esbuildPluginDecorator({
			tsconfigPath: 'tsconfig.json',
		}),
	],
}).catch(() => process.exit(1));
