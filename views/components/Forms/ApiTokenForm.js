import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/fetcher-api/fetcher-middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ApiTokenFormData} from "../../../library/forms/api-token-form";

const sprintf = require("sprintf-js").sprintf;

const ApiTokenForm = ({data, formResponse, config}) => {
    const [apiToken, setApiToken] = useState({});
    const [expiresAt, setExpiresAt] = useState("");
    const [showForm, setShowForm] = useState(false);

    const updateButtonLabel = "Update Token";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchData(
                (config.admin)
                    ?
                    `${ApiConfig.endpoints.admin}/user/api-token/${data.itemId}/detail`
                    :
                    `${ApiConfig.endpoints.user}/api-token/${data.itemId}/detail`
            ).then((response) => {
                setApiToken(response.data.data);
                setExpiresAt(response.data.data.expires_at);
                setShowForm(true);
            })
        }
    }, [data.itemId, data.action, config.admin])

    const submitHandler = (values) => {
        if (data.action === "update") {
            values.id = data.itemId;
        }
        responseHandler(sendData(data.action, sprintf("admin/user/api-token"), values), formResponse);
    }

    const generateApiToken = (e) => {
        e.preventDefault()
        responseHandler(
            fetchData(
                (config.admin)
                    ?
                    `${ApiConfig.endpoints.admin}/user/${config.userId}/api-token/generate`
                    :
                    `${ApiConfig.endpoints.user}/api-token/generate`
            ),
            formResponse
        );
    }

    return (
        <Row>
            {data.action === "update" && showForm &&
            <Col sm={12}>
                <h4>Token</h4>
                <textarea
                    className={"mb-3"}
                    defaultValue={apiToken.token}
                    readOnly={true}
                    rows={5}
                    style={{width: "100%"}}
                />
                {config.admin &&
                    <DataForm
                        formType={"single"}
                        data={ApiTokenFormData(apiToken)}
                        submitCallback={submitHandler}
                        submitButtonText={updateButtonLabel}
                    />
                }
            </Col>
            }
            {data.action !== "update" &&
            <Col sm={12}>
                <Button variant="primary" onClick={generateApiToken}>
                    Generate New Api Token
                </Button>
            </Col>
            }
        </Row>
    );
}
export default ApiTokenForm;