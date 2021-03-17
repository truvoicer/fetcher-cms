
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {
    SESSION_AUTHENTICATED,
    SESSION_AUTHENTICATING,
    SESSION_ERROR, SESSION_LOGIN_REDIRECT, SESSION_STATE_KEY,
    SESSION_USER
} from "../constants/session-constants";

const defaultState = {
    [SESSION_USER]: {},
    [SESSION_AUTHENTICATED]: false,
    [SESSION_AUTHENTICATING]: true,
    [SESSION_LOGIN_REDIRECT]: null,
    [SESSION_ERROR]: {}
};

const defaultReducers = {
    setSessionUser: (state, action) => {
        state[SESSION_USER] = action.payload;
    },
    setSessionAuthenticated: (state, action) => {
        state[SESSION_AUTHENTICATED] = action.payload;
    },
    setSessionAuthenticating: (state, action) => {
        state[SESSION_AUTHENTICATING] = action.payload;
    },
    setSessionLoginRedirect: (state, action) => {
        state[SESSION_LOGIN_REDIRECT] = action.payload;
    },
    setSessionError: (state, action) => {
        state[SESSION_ERROR] = action.payload;
        console.error(state.error)
    },
};

export const sessionApiSlice = createSlice({
    name: SESSION_STATE_KEY,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const sessionApiReducer = sessionApiSlice.reducer;
export const { setSessionUser, setSessionAuthenticated, setSessionAuthenticating, setSessionLoginRedirect, setSessionError } = sessionApiSlice.actions;