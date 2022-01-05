/**
 * Module contains functions operation with local storage.
 * Contains basic implementation of local storage.
 *
 * @module ui/store/localStorage.
 */

import { logLevelMap } from '../../log/constants';
import Logger from '../../log/Logger';

const { ERROR } = logLevelMap;
const logger = Logger.getInstance();

/**
 * Loads sate object from local storage, if no object has been found returns `undefined`.
 *
 * @return {object|undefined} state new state object if it exists.
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {

            // eslint-disable-next-line no-undefined
            return undefined;
        }

        return JSON.parse(serializedState);
    }
    catch (err) {
        logger.send({
            message: `Error during state load: ${ err }`,
            type: ERROR,
        });

        // eslint-disable-next-line no-undefined
        return undefined;
    }
};

/**
 * Serializes and saves state object in local storage.
 * @param {object} state - application state object.
 */
export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    }
    catch (err) {
        logger.send({
            message: `Error during state save: ${ err }`,
            type: ERROR,
        });
    }
};
