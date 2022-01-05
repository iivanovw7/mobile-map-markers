/**
 * POSTCSS variables.
 * @module _/assets/js/variables.js
 */

const fonts = {
    /**
     * Base font size in px.
     * @type number
     */
    fontSize: 16,
    /**
     * Local font name.
     * @type string
     */
    fontLocal: 'Nunito',
    /**
     * Local font family.
     * @type string
     */
    fontFamily: '"Nunito", sans-serif, Fallback, sans-serif',
    /**
     * Light font weight.
     * @type number
     */
    light: 100,
    /**
     * Regular font weight.
     * @type number
     */
    regular: 400,
    /**
     * Bold font weight.
     * @type number
     */
    bold: 500,
};

const common = {
    /**
     * Default border radius.
     * @type string
     */
    borderRadius: '2px',
    /**
     * Default transition duration.
     * @type {String}
     */
    transitionDuration: '250ms',
    /**
     * Set of `z-indexes` used in styles.
     * @type {Object.<string, number>}
     */
    zIndexes: {
        'default': 1,
        'switchContainer': 2,
        'switchHandle': 3
    },
};

module.exports = {
    ...fonts,
    ...common,
    /**
     * Horizontal breakpoints.
     * @type {Object.<string, number>}
     */
    breakpoints: {
        zero: 0,
        /** smartphones, iPhone, portrait 480x320 phones. */
        xs: 320,
        /** portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
        sm: 481,
        /** portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones. */
        md: 641,
        /** tablet, landscape iPad, lo-res laptops ands desktops. */
        lg: 961,
        /** big landscape tablets, laptops, and desktops. */
        xl: 1025,
        /** hi-res laptops and desktops. */
        xxl: 1281
    },
    /**
     * Vertical breakpoints.
     * @type {Object.<string, number>}
     */
    screenHeight: {
        zero: 0,
        /** iPhone 5 */
        xs: 568,
        /** Samsung Galaxy S3 */
        sm: 640,
        /** iPhone 6, 7, 8 */
        md: 667,
        /** iPhone 6+, 7+, 8+ */
        lg: 736,
        /** iPhone X */
        xl: 812,
        /** iPhone XS Max, XR */
        xxl: 896,
    },
};
