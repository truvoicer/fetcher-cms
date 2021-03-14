import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {sendData, responseHandler, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import React from "react";
import Alert from "react-bootstrap/Alert";

const DeleteForm = (props) => {

    const deleteItem = (e) => {
        let data = props.data;
        data.extra = props.config;
        postRequest({
            endpoint: props.data.endpoint,
            operation: "delete",
            requestData: data,
            onSuccess: (data) => {
                props.formResponse(200, data.message, data);
            },
            onError: (error) => {
                if (error.response) {
                    props.formResponse(error.response.status, error.response.data.message);
                }
            }
        })
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