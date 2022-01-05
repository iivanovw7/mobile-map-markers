/**
 * Module contains reducers related to theme switch.
 * @module ui/components/ThemeSwitch/model
 */
import { createSlice } from '@reduxjs/toolkit';

import { DARK_THEME, LIGHT_THEME } from '../../../../config/constants';
import env from '../../../../utils/env';

/**
 * Theme reducer initialState.
 */
export const initState = {
    theme: env.isDarkTheme
        ? DARK_THEME
        : LIGHT_THEME,
};

/**
 *  Combines functions of createAction and createReducer of application.
 *  @return {object} application state slice with state reduces.
 */
const themeProvider = createSlice({
    initialState: initState,
    name: 'state/themeSlice',
    reducers: {
        changeTheme(state, action) {
            state.theme = action.payload;
        },
    },
});

export const { changeTheme } = themeProvider.actions;

export default themeProvider.reducer;
