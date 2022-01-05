/**
 * Module contains production webpack config.
 * @module _/config/webpack/prod
 */
const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { merge } = require('webpack-merge');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const path = require('path');

module.exports = function getWebpackProdConfig(env) {
    const common = require('./webpack.common.js')(env);

    return merge(common, {
        mode: 'production',
        plugins: [
            new WebpackAssetsManifest({
                output: path.join(__dirname, '../../build/dist/asset-manifest.json'),
                merge: true,
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true } ],
                            ['jpegtran', { progressive: true } ],
                            ['optipng', { optimizationLevel: 5 } ],
                            [
                                'svgo',
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                        {
                                            name: 'addAttributesToSVGElement',
                                            params: {
                                                attributes: [ { xmlns: 'http://www.w3.org/2000/svg' } ],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    }
                },
            }),
            new webpack.DefinePlugin({
                'process.env.CONFIG': JSON.stringify('production'),
            }),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: path.join(process.cwd(), '/src/src-sw.js'),
                swDest: 'sw.js'
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            comparisons: false,
                        },
                        parse: {},
                        mangle: true,
                        output: {
                            comments: false,
                            // eslint-disable-next-line camelcase
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                }),
            ],
            concatenateModules: true,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'async',
                maxInitialRequests: Infinity,
                minSize: 0,
                maxSize: 200000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        // eslint-disable-next-line no-shadow
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${ packageName.replace('@', '') }`;
                        },
                    },
                },
            },
        },
        performance: {
            assetFilter: (assetFilename) => ! /(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        output: {
            filename: 'assets/js/[name].[chunkhash].js',
            path: path.resolve(__dirname, '../../build/dist'),
        }
    });
};
