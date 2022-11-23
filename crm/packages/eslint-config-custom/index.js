module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},

	parser: "@typescript-eslint/parser",
	extends: [
		"turbo",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:editorconfig/all",
		"plugin:editorconfig/noconflict",
		"plugin:import/typescript",
	],
	plugins: [
		"@typescript-eslint",
		"simple-import-sort",
		"unused-imports",
		"import",
		"editorconfig",
		"hexagonal-architecture",
	],
	rules: {
		//error prevention
		"array-callback-return": ["error", { checkForEach: true }],
		"no-await-in-loop": "error",
		"no-constant-binary-expression": "error",
		"no-constructor-return": "error",
		"no-promise-executor-return": "error",
		"no-self-compare": "error",
		"no-template-curly-in-string": "error",
		"no-unmodified-loop-condition": "error",
		"no-unreachable-loop": "error",
		"no-unused-private-class-members": "error",
		"no-use-before-define": "error",
		"require-atomic-updates": "error",

		// good practises
		camelcase: "error",
		eqeqeq: "error",
		"new-cap": "off",
		"no-array-constructor": "error",
		"no-console": ["error", { allow: ["error"] }],
		"no-continue": "error",
		"no-else-return": ["error", { allowElseIf: false }],
		"no-extend-native": "error",
		"no-lonely-if": "error",
		"no-param-reassign": "error",
		"no-return-assign": "error",
		"no-throw-literal": "error",
		"no-var": "error",
		"no-multi-spaces": "error",
		"no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
		"object-shorthand": "error",
		"prefer-const": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		radix: "error",
		yoda: "error",
		"@typescript-eslint/ban-types": [
			"error",
			{
				"types": {
					"Function": false,
				},
				"extendDefaults": true
			}
		],

		// style
		semi: "off",
		quotes: [
			"error",
			"single",
			{ "avoidEscape": true, "allowTemplateLiterals": false }
		],
		"lines-between-class-members": ["error", "always"],
		"padded-blocks": ["error", "never"],
		"max-classes-per-file": ["error", 1],
		"max-depth": ["error", 4],
		"max-lines": ["error", {"max": 500, "skipComments": true }],
		"max-lines-per-function": ["off", 100],
		"max-params": ["off", 4],
		"curly": ["error", "all"],
		"object-curly-newline": ["error", {"consistent": true}],
		"object-curly-spacing": ["error","always", {"arraysInObjects": false, "objectsInObjects": true }],
		"array-bracket-newline": ["error", "consistent"],
		"array-bracket-spacing": ["error", "never"],
		"array-element-newline": ["error", "consistent"],
		"arrow-parens": ["error", "always"],
		"arrow-spacing": ["error", {"before": true,"after": true}		],
		"block-spacing": ["error", "always"],
		"brace-style": ["error", "1tbs"],
		"comma-dangle": ["error","always-multiline"],
		"comma-spacing": ["error",{"before": false, "after": true}],
		"comma-style": ["error","last"],
		"computed-property-spacing": ["error","never"],
		"eol-last": ["error","always"],
		"func-call-spacing": ["error","never"],
		"function-call-argument-newline": ["error","consistent"],
		"function-paren-newline": ["error","consistent"],
		"space-in-parens": ["error","never"],

		// plugins
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-duplicates": "error",
		"import/no-restricted-paths": [
			"error",
			{
				zones: [{ target: "./src", from: "./ui" }],
			},
		],
		"import/no-webpack-loader-syntax": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_",
			},
		],
		"@typescript-eslint/no-non-null-assertion": "off",
	},
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
