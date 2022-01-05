/**
 * Module contains SVG icon component.
 * @module ui/elements/Icon
 */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

/**
 * Dynamically loads icon from assets.
 * @name elements/Icon
 * @method
 * @param {object} props - contains component props.
 *
 * @return {JSX.Element} React component with children.
 * @constructor
 */
export function Icon(props) {
    const { path } = props;
    const ImportedIconRef = React.useRef();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true);

        const renderImage = async (imagePath) => {
            ImportedIconRef.current = (await import(`../../../../assets/svg/${ imagePath }.svg`)).ReactComponent;
            setLoading(false);
        };

        renderImage(path);
    }, [path]);

    if (! loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;

        return <ImportedIcon { ...props } />;
    }

    return null;
}

Icon.defaultProps = {
    fill: 'currentColor',
};

Icon.propTypes = {
    path: PropTypes.string.isRequired,
    fill: PropTypes.string,
};

