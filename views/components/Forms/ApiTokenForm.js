import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ApiTokenFormData} from "../../../library/forms/api-token-form";

const ApiTokenForm = ({data, formResponse, config}) => {
    const [apiToken, setApiToken] = useState({});
    const [expiresAt, setExpiresAt] = useState("");
    const [showForm, setShowForm] = useState(false);

    const updateButtonLabel = "Update Token";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint:
                    (config.admin)
                    ?
                    `${ApiConfig.endpoints.admin}/user/api-token`
                    :
                    `${ApiConfig.endpoints.user}/api-token`,
                operation: `${data.itemId}/detail`,
                onSuccess: (responseData) => {
                    setApiToken(responseData.data);
                    setExpiresAt(responseData.data.expires_at);
                    setShowForm(true);
                }
            })
        }
    }, [data.itemId, data.action, config.admin])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.admin,
            operation: `user/api-token/${data.action}`,
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    const generateApiToken = (e) => {
        e.preventDefault()

        fetchRequest({
            endpoint:
                (config.admin)
                    ?
                    `${ApiConfig.endpoints.admin}/user/${config.userId}`
                    :
                    `${ApiConfig.endpoints.user}`,
            operation: `api-token/generate`,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        });
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