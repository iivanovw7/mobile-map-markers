/**
 * Module contains main application configuration.
 * @module config
 */
import { logModeMap } from '../log/constants';

import env from './../utils/env';

const { runningMode } = env;
const { LOGGER_ERROR, LOGGER_DEBUG, LOGGER_OFF } = logModeMap;

const settings = {
    /**
     * Log level, can be set to below options:
     *  - error [default, only errors]
     *  - debug [all levels]
     *  - off   [no logging]
     * @type {string}
     */
    logLevel: LOGGER_ERROR,
    /**
     * Network config.
     * @type {Object}
     */
    net: {
        /**
         * Default request timeout.
         * @type {number}
         */
        requestTimeout: 10000,
    },
    /**
     * Contains default locale value.
     * @type {string}
     */
    locale: 'ru',
    /**
     * Contains list of possible `locale` options.
     * @type {Array.<string>}
     */
    localeList: ['ru', 'en'],
    /**
     * UI timeouts.
     * @type {Object}
     */
    timeout: {
        /**
         * Debounce delay in `ms`.
         * @type {number}
         */
        debounce: 500,
        /**
         * Throttle delay in `ms`.
         * @type {number}
         */
        throttle: 1000
    }
};

/**
 *  Changes config according to application running mode.
 *
 *  @param {object} object - initial settings.
 *  @param {'test' | 'production' | 'development'} mode - application mode, defined during build by webpack.
 */
(function merge(object, mode) {
    let logLevel = LOGGER_ERROR;

    if (mode === 'test') {
        logLevel = LOGGER_OFF;
    }

    if (mode === 'development') {
        logLevel = LOGGER_DEBUG;
    }

    Object.assign(object, { logLevel });

})(settings, runningMode);

export default settings;
