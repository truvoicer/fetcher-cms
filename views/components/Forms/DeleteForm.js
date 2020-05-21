import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {sendData, responseHandler} from "../../../library/api/middleware";
import React from "react";
import Alert from "react-bootstrap/Alert";

class DeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "",
            item_id: ""
        }
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        responseHandler(sendData("delete", this.props.data.endpoint, this.props.data), this.props.formResponse);
    }
    render() {
        return (
            <Row>
                <Col>
                    <Alert variant={"warning"}>
                        Are you sure you want to delete ({this.props.data.itemLabel})?
                    </Alert>
                    <Button variant="primary">Cancel</Button>
                    <Button variant="danger" onClick={this.deleteItem} >Confirm</Button>
                </Col>
            </Row>
        )
    }
}

export default DeleteForm;