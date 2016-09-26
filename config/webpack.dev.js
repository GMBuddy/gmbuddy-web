var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
	debug: true,
	devtool: 'eval',
	entry: [
		'webpack-hot-middleware/client',
		'./src/index.tsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
        preLoaders: [{
				 	test: /\.tsx?$/,
					loader: 'tslint',
					include: SRC_DIR
        }],
		loaders: [
			{
				test: /\.tsx?$/,
				loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react', 'ts'],
				include: SRC_DIR,
				exclude: '/node_modules/'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}]
	},
	resolve: {
		root: [path.resolve('./src/**/*')],
		extensions: ['', '.jsx', '.js', '.tsx', '.ts']
	}
};
