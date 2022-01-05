/**
 * Module contains portal element.
 * @module ui/elements/Portal
 */
import { createPortal } from 'react-dom';

import usePortal from '../../../utils/hooks/usePortal';

/**
 * Creates react portal with children.
 * @param {object} props - object represents props.
 * @return {ReactPortal} react portal.
 *
 * @example
 *  <Portal id="modal">
 *    <p>Thinking with portals</p>
 *  </Portal>
 */
export const Portal = (props) => {
    const { id, children } = props;
    const target = usePortal(id);

    return createPortal(
        children,
        target
    );
};

