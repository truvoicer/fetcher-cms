import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const dateFormat = require('dateformat');
import DatePicker from "react-datepicker";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ProviderFormData} from "../../../library/forms/provider-form";
import {ApiTokenFormData} from "../../../library/forms/api-token-form";

const sprintf = require("sprintf-js").sprintf;

const ApiTokenForm = (props) => {

    const [apiToken, setApiToken] = useState({});
    const [expiresAt, setExpiresAt] = useState("");
    const [showForm, setShowForm] = useState(false);

    const updateButtonLabel = "Update Token";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.getApiToken, props.data.itemId)).then((response) => {
                setApiToken(response.data.data);
                setExpiresAt(response.data.data.expires_at);
                setShowForm(true);
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        responseHandler(sendData(props.data.action, sprintf("admin/user/api-token",), values), props.formResponse);
    }

    const generateApiToken = (e) => {
        e.preventDefault()
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.generateApiToken, props.config.userId)), props.formResponse);
    }

    return (
        <Row>
            {props.data.action === "update" && showForm &&
            <Col sm={12}>
                <h4>Token</h4>
                <textarea
                    className={"mb-3"}
                    defaultValue={apiToken.token}
                    readOnly={true}
                    rows={5}
                    style={{width: "100%"}}
                />
                <DataForm
                    data={
                        ApiTokenFormData(
                            true,
                            new Date(expiresAt).getTime()
                        )
                    }
                    submitCallback={submitHandler}
                    submitButtonText={updateButtonLabel}
                />
            </Col>
            }
            {props.data.action !== "update" &&
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