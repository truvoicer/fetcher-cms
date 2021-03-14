import React from "react";
import Toast from "react-bootstrap/Toast";
import {connect} from "react-redux";
import {
    GLOBAL_ALERT, GLOBAL_ALERT_SHOW, GLOBAL_ALERT_TEXT, GLOBAL_ALERT_VARIANT,
    GLOBAL_STATE_KEY,
    GLOBAL_TOAST,
    GLOBAL_TOAST_SHOW, GLOBAL_TOAST_TEXT, GLOBAL_TOAST_TITLE
} from "../library/redux/constants/global-constants";
import Alert from "react-bootstrap/Alert";
import {setShowAlertAction} from "../library/redux/actions/global-actions";

const App = ({children, globalAlert, globalToast}) => {

    return (
        <div id={"app"}>
            {children}
            <Alert
                show={globalAlert[GLOBAL_ALERT_SHOW]}
                className={"global-alert"}
                variant={globalAlert[GLOBAL_ALERT_VARIANT]}
                onClose={() => setShowAlertAction(false)}
                dismissible
            >
                {globalAlert[GLOBAL_ALERT_TEXT]}
            </Alert>

            <Toast
                show={globalToast[GLOBAL_TOAST_SHOW]}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">{globalToast[GLOBAL_TOAST_TITLE]}</strong>
                </Toast.Header>
                <Toast.Body>{globalToast[GLOBAL_TOAST_TEXT]}</Toast.Body>
            </Toast>

        </div>
    )
}
function mapStateToProps(state) {
    return {
        globalAlert: state[GLOBAL_STATE_KEY][GLOBAL_ALERT],
        globalToast: state[GLOBAL_STATE_KEY][GLOBAL_TOAST]
    };
}

export default connect(
    mapStateToProps,
    null
)(App);