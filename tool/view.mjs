/**
 * View util.
 * @module _/tool/view
 */

'use strict';

import LocalWebServer from 'local-web-server';

import env from './env.js';

const { port } = env.getEnv('production');

LocalWebServer.create({
    directory: './build/dist',
    port: port,
    logFormat: 'dev',
    spa: 'index.html',
}).then((webServer) => {
    webServer.on('verbose', function verboseListener(key, value) {
        if (key === 'server.listening') {
            console.log('Serving at', value.map((item) => item.url).join(', '));
        }
    });
})




