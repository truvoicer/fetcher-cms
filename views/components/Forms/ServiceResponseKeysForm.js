import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest,
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ServiceResponseKeyFormData} from "../../../library/forms/service-response-key-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceResponseKeysForm = ({data, config, formResponse}) => {
    const [serviceResponseKey, setServiceResponseKey] = useState({});

    const addButtonLabel = "Add Response Key";
    const updateButtonLabel = "Update Response Key";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceResponseKey, config.service_id),
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setServiceResponseKey(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        requestData.service_id = config.service_id;
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceResponseKey, config.service_id),
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
                data={ServiceResponseKeyFormData(serviceResponseKey)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}

export default ServiceResponseKeysForm;