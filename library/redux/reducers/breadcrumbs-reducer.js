
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {
    BREADCRUMBS_DATA,
    BREADCRUMBS_ERROR,
    BREADCRUMBS_PAGE_NAME,
    BREADCRUMBS_STATE_KEY
} from "../constants/breadcrumbs-constants";

const defaultState = {
    [BREADCRUMBS_DATA]: {},
    [BREADCRUMBS_PAGE_NAME]: "",
    [BREADCRUMBS_ERROR]: {}
};

const defaultReducers = {
    setBreadcrumbsData: (state, action) => {
        state[BREADCRUMBS_DATA] = action.payload;
    },
    setBreadcrumbsPageName: (state, action) => {
        state[BREADCRUMBS_PAGE_NAME] = action.payload;
    },
    setBreadcrumbsError: (state, action) => {
        state[BREADCRUMBS_ERROR] = action.payload;
        console.error(state.error)
    },
};

export const breadcrumbsApiSlice = createSlice({
    name: BREADCRUMBS_STATE_KEY,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const breadcrumbsApiReducer = breadcrumbsApiSlice.reducer;
export const { setBreadcrumbsData, setBreadcrumbsPageName, setBreadcrumbsError } = breadcrumbsApiSlice.actions;