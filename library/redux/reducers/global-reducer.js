
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {
    GLOBAL_ALERT, GLOBAL_ALERT_SHOW,
    GLOBAL_ALERT_TEXT, GLOBAL_ALERT_TIMEOUT,
    GLOBAL_ALERT_VARIANT,
    GLOBAL_STATE_KEY,
    GLOBAL_TOAST, GLOBAL_TOAST_SHOW,
    GLOBAL_TOAST_TEXT, GLOBAL_TOAST_TIMEOUT,
    GLOBAL_TOAST_TITLE
} from "../constants/global-constants";

const defaultState = {
    [GLOBAL_ALERT]: {
        [GLOBAL_ALERT_VARIANT]: "",
        [GLOBAL_ALERT_TEXT]: "",
        [GLOBAL_ALERT_SHOW]: false,
        [GLOBAL_ALERT_TIMEOUT]: 6000,
    },
    [GLOBAL_TOAST]: {
        [GLOBAL_TOAST_TITLE]: "",
        [GLOBAL_TOAST_TEXT]: "",
        [GLOBAL_TOAST_SHOW]: false,
        [GLOBAL_TOAST_TIMEOUT]: 6000,
    },
};

const defaultReducers = {
    setGlobalAlert: (state, action) => {
        state[GLOBAL_ALERT] = action.payload;
    },
    setShowGlobalAlert: (state, action) => {
        state[GLOBAL_ALERT][GLOBAL_ALERT_SHOW] = action.payload;
    },
    setGlobalToast: (state, action) => {
        state[GLOBAL_TOAST] = action.payload;
    },
    setShowGlobalToast: (state, action) => {
        state[GLOBAL_TOAST][GLOBAL_TOAST_SHOW] = action.payload;
    },
};

export const globalApiSlice = createSlice({
    name: GLOBAL_STATE_KEY,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const globalApiReducer = globalApiSlice.reducer;
export const { setGlobalAlert, setGlobalToast, setShowGlobalAlert, setShowGlobalToast } = globalApiSlice.actions;