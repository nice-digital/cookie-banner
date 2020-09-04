module.exports = {
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
	transform: {
		"^.+\\.(ts)$": "ts-jest",
	},
	preset: "ts-jest",
	collectCoverage: process.env.TEAMCITY_VERSION ? true : false,
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!**/node_modules/**",
		"!src/graphql-fragments/**",
	],
	testResultsProcessor: "jest-teamcity-reporter",
	moduleNameMapper: {
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts",
	},
};
