/**
 * Module used to create combine reducers.
 * @module ui/store/combineReducers.
 */
import { combineReducers } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import localeReducer from '../components/LocaleSwitch/model';
import themeReducer from '../components/ThemeSwitch/model';
import appReducer from '../containers/App/model';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({
    history: createBrowserHistory()
});

/**
 * Merging reducers.
 * @return {function} createReducer - returns function used for store combining.
 */
function createReducer() {
    return combineReducers({
        app: appReducer,
        locale: localeReducer,
        router: routerReducer,
        theme: themeReducer
    });
}

export { createReducer, routerMiddleware, createReduxHistory };

