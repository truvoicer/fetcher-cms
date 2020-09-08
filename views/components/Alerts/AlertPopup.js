import Alert from "react-bootstrap/Alert";
import React, {useState} from "react";

const AlertPopup = (props) => {
    const [showAlert, setShowAlert] = useState(props.showAlert);
    const [alertStatus, setAlertStatus] = useState(props.alertStatus);
    const [alertMessage, setAlertMessage] = useState(props.alertMessage);

    return (
        <Alert variant={alertStatus} this.state.showAlert={true}>
            {alertMessage}
        </Alert>
    )
}
export default AlertPopup;