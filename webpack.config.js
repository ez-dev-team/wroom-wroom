const path = require('path');

module.exports = {
	entry: './engine/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	devServer: {
		contentBase: './dist'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};