module.exports = {
	extends: [
		"./index.js",
	],
	overrides: [
		{
			files: ["src/*/**/*.ts"],
			excludedFiles: ["**/*.module.ts", "**/__shared__/**"],
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
