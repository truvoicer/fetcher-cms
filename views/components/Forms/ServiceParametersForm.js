import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ServiceRequestParameterFormData} from "../../../library/forms/service-request-parameter-form";
import {textTypesOptions} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const ServiceParametersForm = ({data, config, formResponse}) => {
    const [serviceRequestParameter, setServiceRequestParameter] = useState({});

    const addButtonLabel = "Add Request Parameter";
    const updateButtonLabel = "Update Request Parameter";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(
                    `${ApiConfig.endpoints.serviceRequestParameter}/%d`,
                    config.provider_id, config.service_request_id, data.itemId
                ),
                onSuccess: (data) => {
                    setServiceRequestParameter(data.data);
                },
                onError: (error) => {
                    if (error.response) {
                        formResponse(error.response.status, error.response.data.message);
                    }
                }
            })
        }
    }, [data.itemId, data.action])


    const submitHandler = (values) => {
        let endpoint = sprintf(ApiConfig.endpoints.serviceRequestParameter, config.provider_id, config.service_request_id);
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
            endpoint = `${endpoint}/${data.itemId}`
        }
        requestData.service_request_id = config.service_request_id;
        postRequest({
            endpoint: endpoint,
            operation: data.action,
            requestData: requestData,
            onSuccess: (data) => {
                formResponse(200, data.message, data);
            },
            onError: (error) => {
                if (error.response) {
                    formResponse(error.response.status, error.response.data.message);
                }
            }
        })
    }

    return (
        <>
            <DataForm
                formType={"single"}
                data={ServiceRequestParameterFormData((data.action === "update"), serviceRequestParameter, textTypesOptions)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}

export default ServiceParametersForm;