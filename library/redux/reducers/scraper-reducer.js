
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {
    SCRAPER_API_ERROR,
    SCRAPER_API_STATUS,
    SCRAPER_API_STATUS_OFFLINE,
    SCRAPER_API_STATE_KEY
} from "../constants/scraper-constants";

const defaultState = {
    [SCRAPER_API_STATUS]: SCRAPER_API_STATUS_OFFLINE,
    [SCRAPER_API_ERROR]: {}
};

const defaultReducers = {
    setScraperApiStatus: (state, action) => {
        state[SCRAPER_API_STATUS] = action.payload;
    },
    setScraperApiError: (state, action) => {
        state[SCRAPER_API_ERROR] = action.payload;
        console.error(state.error)
    },
};

export const scraperApiSlice = createSlice({
    name: SCRAPER_API_STATE_KEY,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const scraperApiReducer = scraperApiSlice.reducer;
export const { setScraperApiStatus, setScraperApiError } = scraperApiSlice.actions;