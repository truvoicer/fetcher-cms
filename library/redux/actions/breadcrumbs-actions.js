import store from "../store"
import {setBreadcrumbsData, setBreadcrumbsError, setBreadcrumbsPageName} from "../reducers/breadcrumbs-reducer";

export function setBreadcrumbsDataAction(data) {
    store.dispatch(setBreadcrumbsData(data))
}
export function setBreadcrumbsPageNameAction(pageName) {
    store.dispatch(setBreadcrumbsPageName(pageName))
}
export function setBreadcrumbsErrorAction(error) {
    store.dispatch(setBreadcrumbsError(error))
}

