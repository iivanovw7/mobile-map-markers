/**
 * Module contains selectors related to theme.
 * @module ui/containers/ThemeSwitch/model/selectors
 * @author Igor Ivanov
 */
import { createSelector } from '@reduxjs/toolkit';

/**
 * Selector to the theme domain.
 * @method
 * @param {Object} state - application state.
 * @return {string} theme - application theme selector.
 */
export const selectTheme = (state) => state.theme;

/**
 * Select application theme mode.
 * @method
 * @return {Function} creates new theme selector.
 */
export const makeSelectTheme = createSelector(selectTheme, (themeState) => {
    return {
        theme: themeState.theme
    };
});
