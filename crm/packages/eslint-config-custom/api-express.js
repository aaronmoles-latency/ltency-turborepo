module.exports = {
	extends: [
		"./index.js",
	],
	overrides: [
		{
			files: ["src/*/**/*.ts"],
			excludedFiles: ["**/*.module.ts", "**/shared/**"],
			rules: {
				"hexagonal-architecture/enforce": ["error"],
			},
		},
		{
			files: ["tests/*.spec.js"],
			extends: [
				"plugin:jest/recommended",
				"plugin:jest/style",
			],
		},
	],
};
