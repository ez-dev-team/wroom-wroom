const path = require('path')

// TODO: change modes
module.exports = {
	mode: 'development',
	entry: {
		bundle: './src/index.ts',
		game: './src/game/Game.ts',
	},
	devtool: 'eval',
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
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	devServer: {
		contentBase: './dist',
		inline: false
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}

