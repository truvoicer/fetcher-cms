import store from "../store"
import {setScraperApiStatus, setScraperApiError} from "../reducers/scraper-reducer";

export function setScraperApiErrorAction(error) {
    store.dispatch(setScraperApiError(error))
}
export function setScraperApiStatusAction(status) {
    store.dispatch(setScraperApiStatus(status))
}

