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
				test: /cookie-control\.ts/,
				use: "val-loader",
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
				],
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
	plugins: [
		new HtmlWebpackPlugin({
			title: "Cookie banner",
			template: "index.html",
			filename: "index.html",
		}),
		new HtmlWebpackPlugin({
			template: "internal-traffic-exclusion.html",
			filename: "internal-traffic-exclusion.html",
		}),
	],
	devServer: {
		port: process.env.PORT || 8089,
		host: "localhost",
		open: true,
	},
};
