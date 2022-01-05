/**
 * Module contains Error message.
 * @module ui/containers/App/ErrorFallback
 */
import React from 'react';

/**
 * Reloads browser page
 * @param {SyntheticEvent} eventData
 *  object represents click event data
 */
function handleReloadClick(eventData) {
    eventData.preventDefault();
    eventData.stopPropagation();
    location.reload();
}

/**
 * App error fallback message.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export function ErrorFallback() {
    return (
        <div>
            <p>Error</p>
            <a href="/" target="_self" onClick={ handleReloadClick }>
                Reload
            </a>
        </div>
    );
}
