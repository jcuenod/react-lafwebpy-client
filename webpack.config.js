var path = require("path");

module.exports = {
	entry: "./src/main.js",

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},

	devtool: 'inline-source-map',

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					 presets: ['react', 'es2015']
				}
			}
		]
	},

	resolve: {
		root: [
			path.resolve('./src')
		]
	},
};
