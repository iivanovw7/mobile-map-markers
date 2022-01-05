/**
 * Composes multiple methods right-to-left, the output of previous is passed to the input of next one.
 * Uses type of the `last` method.
 *
 * @template {<T>(arg: T) => T} Func
 * @param {Func} fn1 - first method.
 * @param {...Func} [fns] - rest methods to compose.
 * @return {Func} composed methods.
 */
export const compose = (fn1, ...fns) => { // eslint-disable-line arrow-body-style
    return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
};
