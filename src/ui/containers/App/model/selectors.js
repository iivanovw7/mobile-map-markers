/**
 * Module contains app container selectors.
 * @module ui/containers/App/model/selectors
 */
import { createSelector } from '@reduxjs/toolkit';

/**
 * Selects application state.
 * @param {object} state - application root state.
 *
 * @return {object} - object represents application state.
 */
function selectApp(state) {
    return state.app;
}

/**
 * Selects application router state.
 * @param {object} state - application root state.
 *
 * @return {Router} - object represents router state.
 */
function selectRouter(state) {
    return state.router;
}

/**
 * Selects application location.
 * @param {object} state - application root state.
 *
 * @return {Location} object represents application location.
 */
function selectLocation(state) {
    return selectRouter(state).location;
}

/**
 * Selects the app state.
 * @method
 *
 * @return {Function} creates new locale selector.
 */
const makeSelectApp = createSelector(selectApp, (appState) => {
    return {
        loading: appState.loading,
        wait: appState.wait > 0,
    };
});

export { makeSelectApp, selectLocation };
