var path = require("path")
var webpack = require("webpack")

module.exports = {
	entry: "./src/main.js",

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},

	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
	},

	historyApiFallback: true,

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					 presets: ['react', 'es2015']
				}
			}, {
				test: /\.css$/,
				loader: "style!css"
			}, {
				test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: [],

	resolve: {
		root: [
			path.resolve('./src')
		]
	},
}

if (process.env.NODE_ENV === 'production')
{
	module.exports.devtool = "cheap-module-source-map"
	module.exports.plugins.push(
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	)
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false,
			// sourceMap: false // For some reason this makes uglify fail
		})
	)
}
