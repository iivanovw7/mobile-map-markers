import config from '../../config';
import env from '../../utils/env';

const { locale, localeList } = config;

/**
 * Returns user or browser locale.
 * @param {string} [defaultLocale = 'ru'] - fallback value.
 * @return {string} current user locale.
 */
export function getUserLocale(defaultLocale = locale) {
    let userLocale = env.browserLocale;

    if (userLocale) {
        while (userLocale && localeList.indexOf(userLocale) === -1) {
            userLocale = userLocale.substring(0, userLocale.lastIndexOf('-'));
        }
    }

    return userLocale || defaultLocale;
}

/**
 * Returns full locale string.
 * @param {string} code - locale code string.
 * @return {string} full locale.
 */
export function getFullLocale(code) {
    switch (code) {
        case 'en':
            return 'en-US';
        default:
            return 'ru-RU';
    }
}
