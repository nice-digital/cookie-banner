module.exports = {
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
	transform: {
		"^.+\\.(ts)$": "ts-jest",
	},
	preset: "ts-jest",
	collectCoverage: process.env.TEAMCITY_VERSION ? true : false,
	collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
	testResultsProcessor: "jest-teamcity-reporter",
	moduleNameMapper: {
		"\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts",
	},
	testEnvironment: "jsdom",
};
