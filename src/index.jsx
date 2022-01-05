/**
 * Module contains application main entry point.
 * @module app
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/css/critical.css';
import '../assets/css/sanitize.css';
import '../assets/css/_main.pcss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Workbox } from 'workbox-window';

import { App } from './ui/containers/App';
import configureStore from './ui/store/configureStore';
import env from './utils/env';
import { reportWebVitals } from './utils/reportWebVitals';

const { isProduction } = env;
const { store, history: appHistory } = configureStore();
const MOUNT_NODE = document.getElementById('app');

/**
 *  Renders application at specified mount point.
 */
function render() {
    ReactDOM.render(
        <StrictMode>
            <Provider store={ store }>
                <App appHistory={ appHistory } />
            </Provider>
        </StrictMode>,
        MOUNT_NODE
    );
}

render();

if (isProduction && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const wb = new Workbox('/sw.js');

        wb.addEventListener('installed', (eventData) => {
            if (eventData.isUpdate) {
                if (confirm('New app update is available!. Click OK to refresh')) {
                    window.location.reload();
                }
            }
        });
        wb.register();
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
