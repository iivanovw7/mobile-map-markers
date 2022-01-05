/**
 * Module contains application theme switch component.
 * @module ui/components/ThemeSwitch
 */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dark from '../../../../assets/svg/theme/moon.svg';
import Light from '../../../../assets/svg/theme/sun.svg';
import { DARK_THEME, LIGHT_THEME } from '../../../config/constants';
import env from '../../../utils/env';
import { Switch } from '../../elements/Switch';

import { Container } from './index.styled';
import { changeTheme } from './model';
import { makeSelectTheme } from './model/selectors';

const { html } = env;

/**
 * Creates ThemeSwitch component.
 * @name components/ThemeSwitch
 * @method
 *
 * @return {ReactElement} React component with children.
 * @constructor
 */
export function ThemeSwitch() {
    const { theme } = useSelector(makeSelectTheme);
    const dispatch = useDispatch();
    const isDark = theme === DARK_THEME;

    /** Handles theme button click. */
    const handleChange = useCallback(() => {
        const nextTheme = isDark
            ? LIGHT_THEME
            : DARK_THEME;

        dispatch(changeTheme(nextTheme));
        html.dataset.theme = nextTheme;
    }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Switch
                themeSwitch
                checked={ isDark }
                onChange={ handleChange }
                checkedImg={ Dark }
                uncheckedImg={ Light }
            />
        </Container>
    );
}
