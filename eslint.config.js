const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const prettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

module.exports = defineConfig(
	{
		ignores: ["node_modules/**", "lib/**", "dist/**", "coverage/**"],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	prettierRecommended,
	{
		rules: {
			// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
			// e.g. "@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "error",
		},
	},
	{
		// Node-based CommonJS config files (webpack, jest, eslint)
		files: ["*.js"],
		languageOptions: {
			sourceType: "commonjs",
			globals: globals.node,
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
		},
	}
);
