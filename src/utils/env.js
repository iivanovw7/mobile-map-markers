/**
 * Module contains environment related utils.
 * @module utils/env
 */

/**
 * App running mode.
 * @type {string}
 */
const runningMode = process.env.CONFIG;

/**
 * Google maps API key.
 * @type {string}
 */
const googleMapsApiKey = process.env.GOOGLE_MAPS_KEY;

/**
 * Indicates whether the `theme` is set to dark or not.
 *
 * @return {boolean}
 *  returns `true` if is in dark mode.
 */
const isDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

export default {
    browserLocale: navigator.language || navigator['userLanguage'] || navigator['browserLanguage'], // eslint-disable-line dot-notation
    html: document.documentElement,
    /**
     * App running mode.
     * @type {string}
     */
    runningMode,
    googleMapsApiKey,
    isDarkTheme: isDarkTheme(),
    /**
     * Equal `true` is running in production mode.
     * @type {boolean}
     */
    isProduction: runningMode === 'production'
};
