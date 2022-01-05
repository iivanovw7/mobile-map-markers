import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createIntl as _createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import config from '../../config';
import { compose } from '../../utils/func';
import { flattenObject } from '../../utils/object';
import { noop } from '../../utils/stub';
import { importMessages } from '../translations';

const intlCache = createIntlCache();
const { defaultLocale } = config;

/**
 * Returns new `intl` instance to be used outside react components.
 * @param {string} locale - current locale.
 * @param {object} messages - dictionary.
 *
 * @return {object} returns intel object.
 */
export function createIntl(locale, messages) {
    return _createIntl({ locale, messages, onError: noop }, intlCache);
}

const DEFAULT_INTL = createIntl(defaultLocale);

/**
 * React `intl` provider.
 * @param {object} props - object represents component props.
 *
 * @return {ReactElement} React component with children.
 * @constructor
 */
export function IntlProvider(props) {
    const { locale, children } = props;
    const [messages, setMessages] = useState();
    const [intl, setIntl] = useState(DEFAULT_INTL);

    useEffect(() => {
        importMessages(locale).then(compose(setMessages, flattenObject));
    }, [locale]);

    useEffect(() => {
        setIntl(createIntl(locale, messages));
    }, [locale, messages]);

    return (
        <RawIntlProvider value={intl} messages={{...messages}}>
            {children}
        </RawIntlProvider>
    );
}

IntlProvider.propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.node])),
    ])
};
