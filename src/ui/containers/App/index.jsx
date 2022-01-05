/**
 * Module contains App container.
 * @module ui/containers/App
 */
import { useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { IntlProvider } from '../../../locale/api/LocaleProvider';
import { getFullLocale } from '../../../locale/api/utils';
import { logLevelMap } from '../../../log/constants';
import Logger from '../../../log/Logger';
import env from '../../../utils/env';
import { makeSelectLocale } from '../../components/LocaleSwitch/model/selectors';
import { makeSelectTheme } from '../../components/ThemeSwitch/model/selectors';
import { Navigation } from '../Navigation';

import { ErrorFallback } from './ErrorFallback';
import { AppContext, ctx, setAppContext } from './model/context';
import { makeSelectApp } from './model/selectors';
import { createRefContext, setGlobalLoader, setWaitScreen } from './model/util';

const { html, googleMapsApiKey } = env;
const { ERROR } = logLevelMap;
const logger = Logger.getInstance();

/**
 * Main application component.
 * Contains router setup and global styles connection.
 * @constructor
 * @param {object} props - component props.
 *
 * @return {ReactElement} React component with children.
 */
export function App(props) {
    const { appHistory } = props;
    const { wait, loading } = useSelector(makeSelectApp);
    const { theme } = useSelector(makeSelectTheme);
    const { locale } = useSelector(makeSelectLocale);

    // Cannot set language prop dynamically for Google Maps script.
    const [language] = useState(locale);

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey,
        version: 'weekly',
        language: getFullLocale(language)
    });

    /**
     * App error handler.
     * @param {Error} error - app Error object.
     * @param {string} info - string represents componentStack.
     */
    const handleError = useCallback((error, info) => {
        logger.send({
            message: `Application error: ${ error.stack || '' }, componentStack: ${ String(info) }`,
            type: ERROR,
        });
    }, []);

    const refs = Object.entries(ctx).reduce((acc, [key, defaultContext]) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc[key] = useRef(defaultContext);

        return acc;
    }, {});

    const contextValue = useMemo(() => Object.entries(refs).reduce((acc, [key, ref]) => {
        acc[key] = createRefContext(ref);

        return acc;
    }, {}), []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setAppContext(contextValue);
    }, [contextValue]);

    useEffect(() => {
        setWaitScreen(wait || (! isLoaded && ! loadError));
        setGlobalLoader(loading);
    }, [isLoaded, loadError, loading, wait]);

    useEffect(() => {
        html.dataset.theme = theme;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ErrorBoundary FallbackComponent={ ErrorFallback } onError={ handleError }>
            <AppContext.Provider value={ contextValue }>
                <IntlProvider locale={ locale }>
                    <Router history={ appHistory }>
                        <Routes>
                            <Route path="/navigation" element={ <Navigation isLoaded={isLoaded} loadError={loadError} /> } />
                            <Route path="*" element={ <Navigate to="navigation" /> } />
                        </Routes>
                    </Router>
                </IntlProvider>
            </AppContext.Provider>
        </ErrorBoundary>
    );
}

App.propTypes = {
    appHistory: PropTypes.object.isRequired
};
