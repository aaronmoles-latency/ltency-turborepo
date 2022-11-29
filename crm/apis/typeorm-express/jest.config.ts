module.exports = {
	rootDir: 'tests',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
	},
	testEnvironment: 'node',
	coverageDirectory: './coverage',
	cacheDirectory: 'tmp/jestCache',
};
