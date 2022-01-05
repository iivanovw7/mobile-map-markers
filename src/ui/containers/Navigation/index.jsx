/**
 * Module contains Navigation container.
 * @module ui/containers/Navigation
 */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { useLocale } from '../../../utils/hooks/useLocale';
import { GoogleMap } from '../../components/GoogleMap';

import { Wrapper } from './index.styled';

const defaultCenter = {
    lat: 59.934593,
    lng: 30.310766
};

// TODO: Consider moving localized messages to provider.
const markers = [
    {
        id: 1,
        position: {
            'lat': 59.936042,
            'lng': 30.317610
        },
        description: {
            ru: {
                header: 'Маркер #1',
                body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начал',
                footnote: 'сноска сноска сноска'
            },
            en: {
                header: 'Marker #1',
                body: 'Uluru, also referred to as Ayers Rock, is a large sandstone rock formation in the southern part of the Northern Territory, central Australia. It lies 335 km (208 mi) south west of the nearest large town, Alice Springs; 450 km (280 mi) by road. Kata Tjuta and Uluru are the two major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and ',
                footnote: 'footnote footnote footnote'
            }
        }
    },
    {
        id: 2,
        position: {
            'lat': 59.933755,
            'lng': 30.306161
        },
        description: {
            ru: {
                header: 'Маркер #2',
                body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начал',
                footnote: 'сноска сноска сноска'
            },
            en: {
                header: 'Marker #2',
                body: 'Uluru, also referred to as Ayers Rock, is a large sandstone rock formation in the southern part of the Northern Territory, central Australia. It lies 335 km (208 mi) south west of the nearest large town, Alice Springs; 450 km (280 mi) by road. Kata Tjuta and Uluru are the two major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and ',
                footnote: 'footnote footnote footnote'
            }
        }
    },
    {
        id: 3,
        position: {
            'lat': 59.936471,
            'lng': 30.305818
        },
        description: {
            ru: {
                header: 'Маркер #3',
                body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начал',
                footnote: 'сноска сноска сноска'
            },
            en: {
                header: 'Marker #3',
                body: 'Uluru, also referred to as Ayers Rock, is a large sandstone rock formation in the southern part of the Northern Territory, central Australia. It lies 335 km (208 mi) south west of the nearest large town, Alice Springs; 450 km (280 mi) by road. Kata Tjuta and Uluru are the two major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and ',
                footnote: 'footnote footnote footnote'
            }
        }
    }
];

/**
 * Navigation container.
 * @constructor
 * @param {object} props - component props.
 *
 * @return {ReactElement} React component with children.
 */
export function Navigation(props) {
    const { isLoaded, loadError } = props;
    const { getText } = useLocale();

    const handleLocaleChange = useCallback(() => {
        // location.reload();
    }, []);

    if (loadError) {
        return <p>{ getText('map.error') }</p>;
    }

    if (isLoaded) {
        return (
            <Wrapper>
                <GoogleMap
                    defaultZoom={ 15 }
                    defaultCenter={ defaultCenter }
                    markers={ markers }
                    onLocaleChange={ handleLocaleChange } />
            </Wrapper>
        );
    }

    return <p>{ getText('map.loading') }</p>;
}

Navigation.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    loadError: PropTypes.object
};
