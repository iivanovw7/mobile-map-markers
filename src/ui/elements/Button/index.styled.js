/**
 * Module contains styled button elements.
 * @module ui/elements/Button/Styled
 */
import styled, { css } from 'astroturf/react';

export const container = css`
    @mixin justifyAlignFlex;

    flex-direction: row;
`;

export const Button = styled('button').attrs((props) => {
    const { dataId, type = 'button', ...restProps } = props;

    return { 'data-id': dataId, type, ...restProps };
})`
    @mixin transition;

    composes: ${container};
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: $borderRadius;

    &:not([disabled]) {
        &:focus,
        &:focus-visible {
            border-color: var(--primary-accent-color);
            outline: none;
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

export const TextContainer = styled('div')`
    composes: ${container};
`;
