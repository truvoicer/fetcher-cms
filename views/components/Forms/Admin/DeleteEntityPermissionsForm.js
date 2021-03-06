import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {sendData, responseHandler} from "../../../../library/api/fetcher-api/fetcher-middleware";
import React from "react";
import Alert from "react-bootstrap/Alert";

const DeleteEntityPermissionsForm = ({data, formResponse, config}) => {
    const deleteItem = (e) => {
        responseHandler(
            sendData(
                "delete",
                `permission/user/${config.userId}/entity/${config?.entityData?.entity}/${data.data[config?.entityData?.entity]?.id}`,
                {}
            ),
            formResponse
        );
    }

    return (
        <Row>
            <Col>
                <Alert variant={"warning"} style={{overflow: "hidden"}}>
                    Are you sure you want to delete ({data.data[config?.entityData?.entity][config?.entityData?.entity_label_data_key]})?
                </Alert>
                <Button variant="primary" onClick={data.closeModalCallBack}>Cancel</Button>
                <Button variant="danger" onClick={deleteItem} >Confirm</Button>
            </Col>
        </Row>
    )

}

export default DeleteEntityPermissionsForm;