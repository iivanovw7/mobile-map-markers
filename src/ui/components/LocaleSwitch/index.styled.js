/**
 * Module contains additional styles used in theme switcher.
 * @module ui/components/ThemeSwitch/Styled
 */
import styled from 'astroturf/react';

import { Button } from '../../elements/Button/index.styled';

export const LocaleButton = styled(Button)`
    @mixin shadows 'xs';

    width: units(40);
    height: units(40);
    margin: units(10);
    background-color: var(--white);

    svg {
        width: units(30);
        height: units(20);
        border: 1px solid var(--grey-900);
    }
`;
