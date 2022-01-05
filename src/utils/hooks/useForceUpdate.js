import { useIncrementalKey } from './useIncrementalKey';

/**
 * Performs force update.
 * @return {object} returns object containing force update method.
 */
export function useForceUpdate() {
    const [, forceUpdate] = useIncrementalKey();

    return { forceUpdate };
}
