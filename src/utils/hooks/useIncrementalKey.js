import { useReducer } from 'react';

/**
 * Creates incremental reducer.
 * @param {number} initialKey - represents initial key.
 * @return {Array.<object>} object containing state and dispatch method.
 */
export function useIncrementalKey(initialKey = Number.MIN_SAFE_INTEGER) {
    return useReducer((s) => s + 1, initialKey);
}
