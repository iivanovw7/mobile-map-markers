import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const useLocale = () => {
    const intl = useIntl();

    const getText = useCallback((id, values = {}, fallback = null) => intl.formatMessage({ id, defaultMessage: fallback || id }, values),
        [intl]
    );

    return { getText, intl };
};
