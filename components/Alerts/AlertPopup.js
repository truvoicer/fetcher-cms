import Alert from "react-bootstrap/Alert";
import React from "react";

class AlertPopup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      alertStatus: "",
      alertMessage: ""
    }
    this.showAlertPopup = this.showAlertPopup.bind(this);
  }

  componentDidMount() {
  }



  render() {
    return (
        <Alert variant={this.prop.alertStatus} this.state.showAlert={true}>
          {this.prop.alertMessage}
        </Alert>
    )
  }
}
export default AlertPopup;