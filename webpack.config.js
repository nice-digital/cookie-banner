const path = require("path");

module.exports = {
	entry: {
		"cookie-banner": "./src/cdn.ts",
	},
	devtool: "eval",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "cookie-banner.js",
		path: path.resolve(__dirname, "dist"),
	},
};
