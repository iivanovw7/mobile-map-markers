/**
 * Dynamically imports map styles json file.
 * @param {string} theme - represents current theme.
 * @return {Promise<{object}>} map style.
 */
export function importMapStyles(theme) {
    switch (theme) {
        case 'dark':
            return import('../../../../../assets/maps/dark.json');
        default:
            return import('../../../../../assets/maps/light.json');
    }
}
