/**
 * Dev server util.
 * @module _/tool/server
 */

'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const env = require('./env').getEnv('development');

// eslint-disable-next-line import/order
const config = require('../config/webpack/webpack.dev')(env);
const port = env.port;

new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    port,
    hot: true,
}).listen(port, 'localhost', function handleStart(err, result) {
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    if (err) {
        return console.log(err);
    }

    return console.log(`Listening at http://localhost:${ port }\n`);
});
