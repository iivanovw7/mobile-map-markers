/**
 * Module contains styled elements for `GoogleMap` component.
 * @module ui/components/GoogleMap/index.styled
 */
import styled, { stylesheet } from 'astroturf/react';

export const InfoBox = styled('div')`
    margin: units(3);
`;

export const InfoText = styled('div')`
    @mixin fontSize 13, 15;

    color: var(--gray);
    font-family: Roboto, Arial, serif;

    &.header {
        @mixin fontSize 14, 17, bold;

        margin-bottom: units(8);
    }

    &.footnote {
        margin: units(8) 0;
    }
`;

export const Stylesheet = stylesheet`
    .controls {
        @mixin justifyAlignFlex;
    }
    .map {
        width: 100%;
        height: 100%;
    }
`;
