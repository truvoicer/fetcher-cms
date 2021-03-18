import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ServiceRequestResponseKeysFormData} from "../../../library/forms/service-request-response-keys-form";
import {buildServiceRequestSelectOptions} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const RequestResponseKeysForm = ({data, config, formResponse}) => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [requestResponseKey, setRequestResponseKey] = useState({});

    const addButtonLabel = "Add Request Config";
    const updateButtonLabel = "Update Request Config";
    const returnDataTypes = [
        {
            value: "text",
            label: "Text"
        },
        {
            value: "object",
            label: "Object"
        },
        {
            value: "array",
            label: "Array"
        },
    ];

    useEffect(() => {
        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequest, config.provider_id),
            operation: `list`,
            data: {
                provider_id: config.provider_id
            },
            onSuccess: (responseData) => {
                setServiceRequests(buildServiceRequestSelectOptions(responseData.data))
            }
        })
    }, [])
    useEffect(() => {
        if (isSet(data.data.service_response_key) && data?.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.requestResponseKey, config.provider_id, config.service_request_id),
                operation: `${data.data.service_response_key.id}`,
                data: {
                    provider_id: config.provider_id
                },
                onSuccess: (responseData) => {
                    setRequestResponseKey(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action, data.data.service_response_key])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        requestData.service_request_id = config.service_request_id;
        requestData.return_data_type = values.return_data_type.value;
        requestData.service_response_key = data.data.service_response_key;
        postRequest({
            endpoint: sprintf(
                ApiConfig.endpoints.requestResponseKey,
                config.provider_id, config.service_request_id
            ) + `/${requestData.service_response_key.id}`,
            operation: data.action,
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
                data={ServiceRequestResponseKeysFormData(
                    (data.action === "update"),
                    requestResponseKey,
                    serviceRequests,
                    returnDataTypes
                )}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}

export default RequestResponseKeysForm;