/**
 * Module contains utils related to objects.
 * @module utils/object
 */

/**
 * Вызывает метод `then` у объекта `this.promise`, передавая ему указанные аргументы.
 * @param {object} args - arguments.
 * @return {Promise<unknown>} result
 */
export function onThen(...args) {
    // eslint-disable-next-line no-invalid-this
    return this.promise.then(...args);
}

/**
 * Calls `onCatch` on `this.promise` object method with params.
 * @param {object} args - arguments.
 * @return {Promise<unknown>} result
 */
export function onCatch(...args) {
    // eslint-disable-next-line no-invalid-this
    return this.promise['catch'](...args);
}

/**
 * Adds `catch` and then `handlers` to a target object.
 * @param {object} [target] - target object.
 * @return {module:util/object~PromiseHandler} - changed object or new object.
 */
export function addPromiseHandler(target) {
    const result = target || {};

    if (! result.promise) {
        result.promise = Promise.resolve();
    }

    result.onThen = onThen;
    result.onCatch = onCatch;

    return result;
}

/**
 * Flatten a multidimensional object.
 * @param {object} obj - target object.
 * @return {{}} flattened object.
 */
export function flattenObject(obj) {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]));
        }
        else {
            flattened[key] = obj[key];
        }
    });

    return flattened;
}
