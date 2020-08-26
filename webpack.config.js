const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
	plugins: [new HtmlWebpackPlugin()],
	devServer: {
		port: process.env.PORT || 8089,
		host: "localhost",
		publicPath: "/",
		contentBase: path.join(__dirname, "example/"),
		open: true,
	},
};
