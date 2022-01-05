/**
 * Module contains time related functions.
 * @module utils/time
 */

/**
 * Seconds in `minute`.
 * @type {Number}
 */
export const SECONDS_IN_MINUTE = 60;

/**
 * Minutes in `hour`.
 * @type {Number}
 */
export const MINUTES_IN_HOUR = 60;

/**
 * Hours in `day`.
 * @type {Number}
 */
export const HOURS_IN_DAY = 24;

/**
 * Converts days in seconds.
 * @param {number} days - to convert.
 * @return {number} result in `seconds`.
 */
export function daysInSeconds(days) {
    return days * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
}
