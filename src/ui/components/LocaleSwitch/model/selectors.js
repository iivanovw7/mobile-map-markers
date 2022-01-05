/**
 * Module contains selectors related to localization.
 * @module ui/components/LocaleSwitch/model/selectors
 * @author Igor Ivanov
 */
import { createSelector } from '@reduxjs/toolkit';

import { initState } from './index';

/**
 * Selector to the language domain.
 * @method
 * @param {Object} state - application state.
 * @return {string} language - application language selector.
 */
const selectLanguage = (state) => state.locale || initState;

/**
 * Select the language locale.
 * @method
 * @return {Function} creates new locale selector.
 */
const makeSelectLocale = createSelector(selectLanguage, (languageState) => {
    return {
        locale: languageState.locale
    };
});

export { selectLanguage, makeSelectLocale };
