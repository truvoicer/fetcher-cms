import store from "../store"
import {
    GLOBAL_ALERT, GLOBAL_ALERT_SHOW, GLOBAL_ALERT_TEXT,
    GLOBAL_ALERT_TIMEOUT,
    GLOBAL_ALERT_VARIANT,
    GLOBAL_STATE_KEY
} from "../constants/global-constants";
import produce from "immer";
import {setGlobalAlert, setShowGlobalAlert, setShowGlobalToast} from "../reducers/global-reducer";

export function setShowAlertAction(show) {
    store.dispatch(setShowGlobalAlert(show))
}
export function setShowToastAction(show) {
    store.dispatch(setShowGlobalToast(show))
}
export function setSuccessAlertAction({timeout = 6000, text = ""}) {
    setGlobalAlertAction({
        variant: "success",
        text: text,
        timeout: timeout
    })
}
export function setWarningAlertAction({timeout = 6000, text = ""}) {
    setGlobalAlertAction({
        variant: "warning",
        text: text,
        timeout: timeout
    })
}
export function setErrorAlertAction({timeout = 6000, text = ""}) {
    setGlobalAlertAction({
        variant: "danger",
        text: text,
        timeout: timeout
    })
}
export function setInfoAlertAction({timeout = 6000, text = ""}) {
    setGlobalAlertAction({
        variant: "info",
        text: text,
        timeout: timeout
    })
}
export function setGlobalAlertAction({variant = "primary", timeout = 6000, text = ""}) {
    const globalAlertState = {...store.getState()[GLOBAL_STATE_KEY][GLOBAL_ALERT]};
    const nextState = produce(globalAlertState, (draftState) => {
        draftState[GLOBAL_ALERT_VARIANT] = variant;
        draftState[GLOBAL_ALERT_TIMEOUT] = timeout;
        draftState[GLOBAL_ALERT_TEXT] = text;
        draftState[GLOBAL_ALERT_SHOW] = true;
    })
    store.dispatch(setGlobalAlert(nextState))
}

