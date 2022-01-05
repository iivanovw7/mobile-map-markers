import { useEffect } from 'react';

export const useOnClickOutside = (handler, ...elements) => {
    useEffect(() => {
        const listener = (eventData) => {
            for (const element of elements) {
                if (element?.current?.contains(eventData.target)) {
                    return;
                }
            }

            handler();
        };

        document.addEventListener('pointerdown', listener);

        return () => document.removeEventListener('pointerdown', listener);

    }, [...elements, handler]); // eslint-disable-line react-hooks/exhaustive-deps
};
