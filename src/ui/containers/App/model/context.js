import { createContext } from 'react';

export const ctx = {
};

export const AppContext = createContext(null);

export const setAppContext = (value) => Object.assign(ctx, value);
