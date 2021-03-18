import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest,
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import DataForm from "./DataForm/DataForm";
import {ServiceRequestConfigFormData} from "../../../library/forms/service-request-config-form";
import {formListSelectedValueType} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const ServiceConfigForm = ({data, config, formResponse}) => {
    const [serviceRequestConfig, setServiceRequestConfig] = useState({});

    const addButtonLabel = "Add Request Config";
    const updateButtonLabel = "Update Request Config";

    useEffect(() => {
        if (data?.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, config.provider_id, config.service_request_id),
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setServiceRequestConfig(responseData.data);
                }
            });
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            values.id = data.itemId;
        }
        requestData.service_request_id = config.service_request_id;
        requestData.selected_value_type = values.value_types.value;
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, config.provider_id, config.service_request_id),
            operation: (data.action === "update")? `${data.itemId}/update` : "create",
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            <DataForm
                formType={"single"}
                data={ServiceRequestConfigFormData((data.action === "update"), serviceRequestConfig, formListSelectedValueType)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}

export default ServiceConfigForm;