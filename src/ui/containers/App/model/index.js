/**
 * Module contains state slice reducers related to all application.
 * @module ui/containers/App/model
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Contains initial state.
 */
export const initialState = {
    /** Controls top page loading bar. */
    loading: false,
    /** Controls application wait screen. */
    wait: 0,
};

/**
 *  Combines functions of createAction and createReducer of application.
 *
 *  @return {Object}
 *     application state slice with state reduces.
 */
const appSlice = createSlice({
    initialState,
    name: 'state/appSlice',
    reducers: {
        completeWait(state) {
            if (state.wait > 0) {
                state.wait = 0;
            }
        },
        setLoader(state, action) {
            state.loading = action.payload;
        },
        startWait(state) {
            state.wait++;
        },
        stopWait(state) {
            if (state.wait > 0) {
                state.wait--;
            }
        }
    }
});

export const { startWait, stopWait, completeWait, setLoader } = appSlice.actions;

export default appSlice.reducer;
