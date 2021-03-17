import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import React from "react";
import Alert from "react-bootstrap/Alert";

const DeleteForm = ({data, config, formResponse}) => {

    const deleteItem = (e) => {
        let endpoint;
        if (typeof data.endpoint === "function") {
            endpoint = data.endpoint(data?.data)
        } else {
            endpoint = `${data.endpoint}/${data.item_id}`;
        }
        let requestData = {...data};
        requestData.extra = config;
        postRequest({
            endpoint: endpoint,
            operation: `delete`,
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData);
            },
            onError: (error) => {
                if (error.response) {
                    formResponse(error.response.status, error.response.data.message);
                }
            }
        })
    }

    return (
        <Row>
            <Col>
                <Alert variant={"warning"} style={{overflow: "hidden"}}>
                    Are you sure you want to delete ({data.itemLabel})?
                </Alert>
                <Button variant="primary" onClick={data.closeModalCallBack}>Cancel</Button>
                <Button variant="danger" onClick={deleteItem} >Confirm</Button>
            </Col>
        </Row>
    )

}

export default DeleteForm;