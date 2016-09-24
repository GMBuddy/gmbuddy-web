var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    devtool: 'eval',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.DefinePlugin({
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
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['babel', 'ts'],
            include: SRC_DIR
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
