/**
 * Module contains app container utils.
 * @module ui/containers/App/model/util
 */

const waitScreen = document.querySelector('.preloader');
const globalLoader = document.querySelector('.preloader-progress');

/**
 * Sets wait screen state.
 * @param {boolean} isShown - If `true` shows application wait screen.
 */
export function setWaitScreen(isShown) {
    if (waitScreen) {
        const { classList } = waitScreen;

        if (isShown) {
            classList.remove('preloader-hidden');
        }
        else if (! classList.contains('preloader-hidden')) {
            classList.add('preloader-hidden');
        }
    }
}

/**
 * Sets global loader visibility state.
 * @param {boolean} isVisible - If `true` shows top progress bar.
 */
export function setGlobalLoader(isVisible) {
    if (globalLoader) {
        globalLoader.style.display = isVisible
            ? 'block'
            : 'none';
    }
}

/**
 * Creates application context.
 * @param {object} ref - ref object.
 * @return {{}} - object context reference.
 */
export function createRefContext(ref) {
    return Object.keys(ref.current).reduce((acc, key) => {
        if (typeof ref.current[key] === 'function') {
            acc[key] = (...args) => ref.current[key](...args);
        }
        else {
            Object.defineProperty(acc, key, {
                get: function() {
                    return ref.current[key];
                },
            });
        }

        return acc;
    }, {});
}

