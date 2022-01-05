/**
 * Module contains additional styles used in theme switcher.
 * @module ui/components/ThemeSwitch/Styled
 */
import styled from 'astroturf/react';

export const Container = styled('div')`
    @mixin justifyAlignFlex;
    @mixin shadows 'xs';

    height: units(40);
    margin: units(10);
    padding: 0 units(6);
    background-color: var(--white);
    border-radius: $borderRadius;
`;
