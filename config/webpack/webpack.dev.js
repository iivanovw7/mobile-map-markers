/**
 * Module contains development webpack config.
 * @module _/config/webpack/dev
 */
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { merge } = require('webpack-merge');

module.exports = function getWebpackDevConfig(env) {
    const common = require('./webpack.common.js')(env);

    return merge(common, {
        mode: 'development',
        stats: {
            children: true
        },
        devtool: 'inline-source-map',
        plugins: [
            new DashboardPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.CONFIG': JSON.stringify('development'),
            }),
        ]
    });
};
