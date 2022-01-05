/**
 * Module contains Web Vitals config.
 * @module utils/reportWebVitals
 */

/**
 * Adds performance measurement methods.
 * @see {@link https://create-react-app.dev/docs/measuring-performance/}
 * @param {object} onPerfEntry - optional report handler (`console.log`).
 */
export function reportWebVitals(onPerfEntry) {
    if (onPerfEntry) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
}
