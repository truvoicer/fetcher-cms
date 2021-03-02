import store from "../store"
import {
    setSessionAuthenticated,
    setSessionAuthenticating,
    setSessionError,
    setSessionUser
} from "../reducers/session-reducer";

export function setSessionUserAction(user) {
    store.dispatch(setSessionUser(user))
}
export function setSessionAuthenticatedAction(status) {
    store.dispatch(setSessionAuthenticated(status))
}
export function setSessionAuthenticatingAction(status) {
    store.dispatch(setSessionAuthenticating(status))
}
export function setSessionErrorAction(error) {
    store.dispatch(setSessionError(status))
}

