/**
 * Module contains GoogleMap control component.
 * @module ui/components/GoogleMap/Control
 */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { createRootElement } from '../../../utils/hooks/usePortal';

import { Stylesheet } from './index.styled';

/**
 * Control component.
 * @constructor
 * @param {object} props - component props.
 *
 * @return {ReactPortal} React portal with children and container.
 */
export function Control(props) {
    const {
        map,
        containerId,
        children,
        position = window.google.maps.ControlPosition.LEFT_TOP,
    } = props;
    const [container] = useState(createRootElement(containerId));

    container.classList.add(Stylesheet.controls);

    useEffect(() => () => {
        if (map && map.controls) {
            const controls = map.controls[position];

            if (controls && controls.sd) {
                const index = controls.sd.findIndex((el) => el && String(el).includes(containerId));

                if (index !== -1) {
                    controls.removeAt(index);
                }
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (map && map.controls) {
            map.controls[position].push(container);
        }
    }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

    return createPortal(children, container);
}

Control.propTypes = {
    containerId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.node])),
    ]),
    map: PropTypes.object,
    position: PropTypes.string,
};
