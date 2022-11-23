module.exports = {
	ignorePatterns: ['dist', 'node_modules'],
	extends: 'eslint-config-custom/node-package',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
};
