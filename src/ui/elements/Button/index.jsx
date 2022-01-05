/**
 * Module contains button component
 * @module ui/elements/Button
 */
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import { Button as StyledButton, TextContainer } from './index.styled';

/**
 * Creates `PlainButton` component.
 * @constructor
 * @name elements/Button
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<HTMLButtonElement>} ref - contains button `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const Button = forwardRef((props, ref) => {
    const { children, disabled, dataId, variant, text, onClick } = props;

    return (
        <StyledButton
            ref={ ref }
            dataId={ dataId }
            variant={ variant }
            onClick={ onClick }
            disabled={ disabled }>
            { children }
            { text && (
                <TextContainer>
                    { text }
                </TextContainer>
            ) }
        </StyledButton>
    );
});

Button.displayName = 'Button';

Button.defaultProps = {
    disabled: false,
    variant: 'primary',
};

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.node])),
    ]),
    dataId: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func
};

