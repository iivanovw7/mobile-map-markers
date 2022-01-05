/**
 * Module contains GoogleMap component.
 * @module ui/components/GoogleMap
 */
import { GoogleMap as MapComponent, InfoWindow, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useLocale } from '../../../utils/hooks/useLocale';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import { LocaleSwitch } from '../LocaleSwitch';
import { ThemeSwitch } from '../ThemeSwitch';
import { makeSelectTheme } from '../ThemeSwitch/model/selectors';

import { Control } from './Control';
import { InfoBox, InfoText, Stylesheet } from './index.styled';
import { importMapStyles } from './model/utils';

/**
 * Horizontal infoWindow offset.
 * @type {number}
 */
const infoOffsetX = -1;
/**
 * Vertical infoWindow offset.
 * @type {number}
 */
const infoOffsetY = -28;
/**
 * Number is used to calculate inbounds padding for different dimensions.
 * @type {number}
 */
const boundsPaddingFactor = 0.1;

/**
 * GoogleMap component.
 * @constructor
 * @param {object} props - component props.
 *
 * @return {ReactElement} React component with children.
 */
export function GoogleMap(props) {
    const { defaultCenter, markers, defaultZoom, onLocaleChange } = props;
    const { intl: { locale } } = useLocale();
    const { theme } = useSelector(makeSelectTheme);
    const { width } = useWindowDimensions();
    const [map, setMap] = useState(null);
    const [styles, setStyles] = useState();
    const [info, setInfo] = useState(null);

    const handleMarkerClick = (markerInfo) => () => {
        setInfo(markerInfo);

        if (map) {
            const { position: { lat, lng } } = markerInfo;

            map.panTo(new window.google.maps.LatLng(lat, lng));
        }
    };

    const handleMarkerCloseClick = useCallback(() => {
        setInfo(null);
    }, [setInfo]);

    const onLoad = useCallback((mapData) => {
        setMap(mapData);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    useEffect(() => {
        importMapStyles(theme).then(setStyles);
    }, [theme]);

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();

            markers.forEach(({ position }) => {
                bounds.extend(new window.google.maps.LatLng(
                    position.lat, position.lng
                ));
            });

            map.fitBounds(bounds, width * boundsPaddingFactor);
        }
    }, [markers, map, width]);

    return (
        <MapComponent
            mapContainerClassName={ Stylesheet.map }
            options={ {
                mapTypeControl: false,
                streetViewControl: false,
                styles
            } }
            defaultCenter={ defaultCenter }
            defaultZoom={ defaultZoom }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
            mapTypeId={ window.google.maps.MapTypeId.ROADMAP }
        >
            { markers.map((marker) => (
                <Marker
                    key={ uuidv4() }
                    position={ marker.position }
                    onClick={ handleMarkerClick(marker) }
                >
                    { Boolean(info && info.id === marker.id) && (
                        <InfoWindow
                            position={ info.position }
                            onUnmount={ handleMarkerCloseClick }
                            onCloseClick={ handleMarkerCloseClick }
                            options={ {
                                maxWidth: 204,
                                pixelOffset: new window.google.maps.Size(infoOffsetX, infoOffsetY)
                            } }
                        >
                            <InfoBox>
                                <InfoText header>{ info.description[locale].header }</InfoText>
                                <InfoText>{ info.description[locale].body }</InfoText>
                                <InfoText footnote>{ info.description[locale].footnote }</InfoText>
                            </InfoBox>
                        </InfoWindow>
                    ) }
                </Marker>
            )) }
            { Boolean(map) && (
                <Control map={ map } containerId="google-map-custom-controls">
                    <LocaleSwitch onChange={ onLocaleChange } />
                    <ThemeSwitch />
                </Control>
            ) }
        </MapComponent>
    );
}

GoogleMap.defaultProps = {
    defaultZoom: 10
};

GoogleMap.propTypes = {
    defaultCenter: PropTypes.object.isRequired,
    defaultZoom: PropTypes.number,
    markers: PropTypes.array,
    onLocaleChange: PropTypes.func,
};
