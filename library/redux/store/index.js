import {
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import {scraperApiReducer} from "../reducers/scraper-reducer";
import {SCRAPER_API_STATE_KEY} from "../constants/scraper-constants";

const middleware = [
    ...getDefaultMiddleware(),
    thunk
];
const reducer = {
    [SCRAPER_API_STATE_KEY]: scraperApiReducer,
}
const store = configureStore({
    reducer,
    middleware,
});

export default store;