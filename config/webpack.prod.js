var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'gmbuddy.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.DefinePlugin({
            '__DEV__': false,
            '__DEVTOOLS__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourcetMap: false,
            mangle: true,
            minimize: true,
            comments: false,
            compress: {
                warnings: false
            },
        })
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
        root: [path.resolve('./src')],
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    },
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};
