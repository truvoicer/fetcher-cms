import {
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import {scraperApiReducer} from "../reducers/scraper-reducer";
import {SCRAPER_API_STATE_KEY} from "../constants/scraper-constants";
import {SESSION_STATE_KEY} from "../constants/session-constants";
import {sessionApiReducer} from "../reducers/session-reducer";
import {BREADCRUMBS_STATE_KEY} from "../constants/breadcrumbs-constants";
import {breadcrumbsApiReducer} from "../reducers/breadcrumbs-reducer";
import {GLOBAL_STATE_KEY} from "../constants/global-constants";
import {globalApiReducer} from "../reducers/global-reducer";

const middleware = [
    ...getDefaultMiddleware(),
    thunk
];
const reducer = {
    [SCRAPER_API_STATE_KEY]: scraperApiReducer,
    [SESSION_STATE_KEY]: sessionApiReducer,
    [BREADCRUMBS_STATE_KEY]: breadcrumbsApiReducer,
    [GLOBAL_STATE_KEY]: globalApiReducer,
}
const store = configureStore({
    reducer,
    middleware,
});

export default store;