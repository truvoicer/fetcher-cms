import ApiConfig from '../../../config/api-config'
import {
    fetchData,
    fetchRequest,
    postRequest,
    responseHandler,
    sendData
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestParameterFormData} from "../../../library/forms/service-request-parameter-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceParametersForm = (props) => {

    const addButtonLabel = "Add Request Parameter";
    const updateButtonLabel = "Update Request Parameter";

    const [serviceRequestParameter, setServiceRequestParameter] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectData, setSelectData] = useState({
        value_types: {
            label: "Text",
            value: "text"
        }
    });

    const [selectOptions, setSelectOptions] = useState({
        value_types: [
            {
                label: "Text",
                value: "text"
            },
            {
                label: "Textarea",
                value: "textarea"
            }
        ],
    });
    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchRequest({
                endpoint: sprintf(
                    `${ApiConfig.endpoints.serviceRequestParameter}/%d`,
                    props.config.provider_id, props.config.service_request_id, props.data.itemId
                ),
                onSuccess: (data) => {
                    setServiceRequestParameter(data.data);
                    setShowForm(true);
                },
                onError: (error) => {
                    if (error.response) {
                        props.formResponse(error.response.status, error.response.data.message);
                    }
                }
            })
        }
    }, [props.data.itemId, props.data.action])


    const submitHandler = (values) => {
        let endpoint = sprintf(ApiConfig.endpoints.serviceRequestParameter, props.config.provider_id, props.config.service_request_id);
        let requestData = {...values};
        if (props.data.action === "update") {
            requestData.id = props.data.itemId;
            endpoint = `${endpoint}/${props.data.itemId}`
        }
        requestData.service_request_id = props.config.service_request_id;
        postRequest({
            endpoint: endpoint,
            operation: props.data.action,
            requestData: requestData,
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
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestParameterFormData(
                        true,
                        serviceRequestParameter.parameter_name,
                        serviceRequestParameter.parameter_value,
                    )
                }
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceRequestParameterFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default ServiceParametersForm;