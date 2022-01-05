/**
 * Module contains application locale switch component.
 * @module ui/components/LocaleSwitch
 */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import config from '../../../config';
import { Icon } from '../../elements/Icon';

import { LocaleButton } from './index.styled';
import { changeLocale } from './model';
import { makeSelectLocale } from './model/selectors';

const { localeList } = config;

/**
 * Creates LocaleSwitch component.
 * @name components/LocaleSwitch
 * @method
 * @param {object} props - component props.
 *
 * @return {JSX.Element} React component with children.
 * @constructor
 */
export function LocaleSwitch(props) {
    const { onChange } = props;
    const { locale } = useSelector(makeSelectLocale);
    const dispatch = useDispatch();

    /**
     * Handles locale button click.
     */
    const handleClick = useCallback(() => {
        const currentLocaleIndex = localeList.indexOf(locale);
        const nextLocale = localeList[(currentLocaleIndex + 1) % localeList.length];

        dispatch(changeLocale(nextLocale));

        if (onChange) {
            onChange(nextLocale);
        }
    }, [dispatch, locale, onChange]);

    return (
        <LocaleButton onClick={handleClick}>
            <Icon path={ `locale/${locale}` } />
        </LocaleButton>
    );
}

LocaleSwitch.defaultProps = {};

LocaleSwitch.propTypes = {
    onChange: PropTypes.func,
};
