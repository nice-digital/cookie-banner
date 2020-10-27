const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const pkg = require("./package.json"),
	baseConfig = require("./webpack.config");

module.exports = function (env) {
	const commonConfig = {
		devtool: "source-map",

		mode: "production",

		// Our bundle is bigger than webpack's recommended size but that's OK - just ignore the message
		performance: { hints: false },

		plugins: [
			new webpack.BannerPlugin({
				banner: [
					`NICE Cookie Banner ${(env && env.version) || pkg.version} | ${
						new Date().toISOString().split("T")[0]
					}`,
					`© Copyright NICE 2015-${new Date().getFullYear()}`,
					"Licensed under MIT (https://github.com/nice-digital/cookie-banner/blob/master/LICENSE)",
				].join("\n"),
			}),
		],
	};

	return [
		// Dev version
		merge(baseConfig, commonConfig, {
			plugins: [new CleanWebpackPlugin()],
			optimization: {
				minimize: false,
			},
		}),
		// Minified version
		merge(baseConfig, commonConfig, {
			output: {
				filename: "[name].min.js",
			},
			mode: "production",
		}),
	];
};
