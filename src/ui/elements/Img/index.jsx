/**
 * Module renders an image with parameters
 * @module ui/elements/Img
 * @author Igor Ivanov
 */
import PropTypes from 'prop-types';
import React from 'react';

import { Img as StyledImg } from './index.styled';

/**
 * Creates image component.
 * @name elements/Img
 * @method
 * @param {object} props - contains component props.
 *
 * @return {JSX.Element} React component with children.
 * @constructor
 */
export function Img(props) {
    const { src, alt, id, onClick, handleLoad } = props;

    return (
        <StyledImg
            src={src}
            alt={alt}
            data-id={id}
            onLoad={handleLoad}
            onClick={onClick}
        />
    );
}

Img.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    handleLoad: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
};

