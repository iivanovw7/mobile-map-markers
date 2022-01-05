/**
 * Module contains switch component
 * @module ui/elements/Switch
 */
import { css } from 'astroturf';
import PropTypes from 'prop-types';
import React from 'react';

import { Checkbox, Container, Handle, Wrapper } from './index.styled';

/**
 * Creates switch component.
 * @name elements/Switch
 * @method
 * @param {Object} props - contains component props
 * @return {ReactElement} React component with children.
 * @constructor
 */
export function Switch(props) {
    const {
        onChange,
        checked,
        themeSwitch,
        checkedImg,
        uncheckedImg
    } = props;

    const image = checked
        ? checkedImg
        : uncheckedImg;

    return (
        <Wrapper>
            <Checkbox onChange={ onChange } checked={ checked } />
            <Handle />
            <Container
                css={ css`
                    background-image: ${ (image && `url(${ image }) `) || 'none' };
                ` }
                checked={ checked }
                theme={ themeSwitch }
            />
        </Wrapper>
    );
}

Switch.defaultProps = {
    checkedImg: null,
    themeSwitch: false,
    uncheckedImg: null
};

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    checkedImg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    themeSwitch: PropTypes.bool,
    uncheckedImg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
};
