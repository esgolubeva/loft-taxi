module.exports = {
	env: {
		browser: true,
		es6: true,
		"jest/globals": true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jest/recommended"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "jest",  "react-hooks"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
		"react-hooks/rules-of-hooks": "error"
	}
};
