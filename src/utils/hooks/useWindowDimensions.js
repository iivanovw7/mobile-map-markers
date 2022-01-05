import { useState, useEffect } from 'react';

/**
 * Returns current screen size.
 * @return {{width: number, height: number}} object reference to a current dimension.
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height
    };
}

/**
 * Hook is used to determine current dimension.
 *
 * @return {{width: number, height: number}} object reference to a current dimension.
 *
 * @example
 *  const Component = () => {
 *   const { height, width } = useWindowDimensions();
 *
 *   return (
 *     <div>
 *       width: {width} ~ height: {height}
 *     </div>
 *   );
 * }
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        /**
         * Screen resize handler.
         */
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
