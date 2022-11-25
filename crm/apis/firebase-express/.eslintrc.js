module.exports = {
	ignorePatterns: ['dist', 'node_modules'],
	extends: 'eslint-config-custom/api-express',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
};
