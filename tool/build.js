/**
 * Build util.
 * @module _/tool/build
 */

'use strict';

const webpack = require('webpack');

const env = require('./env').getEnv('production');

// eslint-disable-next-line import/order
const config = require('../config/webpack/webpack.prod.js')(env);

webpack(config, function handler(err, stats) {
    if (err) {
        console.error(err.stack || err);

        if (err.details) {
            console.error(err.details);
        }
    }
    else {
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            })
        );

        if (stats.hasErrors()) {
            console.error('✗ Build was stopped due to errors.');
        }

        console.log('✓ Build is finished.');
    }
});
