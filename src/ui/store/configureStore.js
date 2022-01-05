/**
 * Module used to create combine reducers.
 * @module ui/store/combineReducers.
 */
import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension';

import config from '../../config';
import env from '../../utils/env';

import { createReducer, routerMiddleware, createReduxHistory } from './combineReducers';
import { loadState, saveState } from './localStorage';

const { isProduction } = env;
const { timeout } = config;
/**
 * Function creates base application store and applies middlewares
 * @return {any} returns application store object and history object.
 */
export default function configureStore() {
    let composeEnhancers = compose;
    const persistedState = loadState();

    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    if (! isProduction && typeof window === 'object') {
        // @ts-ignore eslint-disable-line
        composeEnhancers = composeWithDevTools;
    }

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        routerMiddleware
    ];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        { ...persistedState },
        composeEnhancers(...enhancers)
    );

    // Refreshing persisted state
    store.subscribe(
        throttle(() => {
            saveState({
                theme: store.getState().theme,
                locale: store.getState().locale,
            });
        }, timeout.throttle)
    );

    // Make reducers hot reloadable, see http://mxs.is/googmo
    // @ts-ignore eslint-disable-line @typescript-eslint/ban-ts-comment
    if (module.hot) {
        // @ts-ignore eslint-disable-line @typescript-eslint/ban-ts-comment
        module.hot.accept('./combineReducers', () => {
            store.replaceReducer(createReducer());
        });
    }

    return { store, history: createReduxHistory(store) };
}

