import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {sendData, responseHandler} from "../../../library/api/middleware";
import React from "react";
import Alert from "react-bootstrap/Alert";

const DeleteForm = (props) => {

    const deleteItem = (e) => {
        let data = props.data;
        data.extra = props.config;
        responseHandler(sendData("delete", props.data.endpoint, data), props.formResponse);
    }

    return (
        <Row>
            <Col>
                <Alert variant={"warning"} style={{overflow: "hidden"}}>
                    Are you sure you want to delete ({props.data.itemLabel})?
                </Alert>
                <Button variant="primary" onClick={props.data.closeModalCallBack}>Cancel</Button>
                <Button variant="danger" onClick={deleteItem} >Confirm</Button>
            </Col>
        </Row>
    )

}

export default DeleteForm;