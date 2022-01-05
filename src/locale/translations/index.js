/**
 * Returns set of localized messages according to locale value.
 * @param {string} locale - current application locale code.
 * @return {Promise<*>} messages import.
 */
export function importMessages(locale) {
    switch (locale) {
        case 'en':
            return import('./en');
        default:
            return import('./ru');
    }
}
