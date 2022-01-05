/**
 * Module contains reducers related to localization.
 * @module ui/components/LocaleSwitch/model
 */
import { createSlice } from '@reduxjs/toolkit';

import { getUserLocale } from '../../../../locale/api/utils';

/**
 * Describes initial state fields.
 * @typedef {object} module:ui/components/LocaleSwitch/model~initialState
 * @property {String} locale - current locale.
 */

/**
 * Contains initial state.
 * @type {module:ui/components/LocaleSwitch/model~initState}
 */
export const initState = {
    locale: getUserLocale(),
};

/**
 *  Combines functions of createAction and createReducer of application.
 *  @return {Object} application state slice with state reduces.
 */
const localeProvider = createSlice({
    name: 'state/localeSlice',
    initialState: initState,
    reducers: {
        changeLocale(state, action) {
            state.locale = action.payload;
        },
    },
});

export const { changeLocale } = localeProvider.actions;

export default localeProvider.reducer;
