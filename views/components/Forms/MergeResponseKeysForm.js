import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {MergeResponseKeysFormData} from "../../../library/forms/merge-response-keys-form";
import {buildServiceRequestSelectOptions} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const MergeResponseKeysForm = ({data, config, formResponse}) => {
    const addButtonLabel = "Merge Response Keys";
    const [serviceRequests, setServiceRequests] = useState([]);

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


    const submitHandler = (values) => {
        let requestData = {...values};
        requestData.destination_service_request_id = config.service_request_id;
        if (isSet(values.source_service_request) && isSet(values.source_service_request.value)) {
            requestData.source_service_request_id = requestData.source_service_request.value;
        }
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.requestResponseKey, config.provider_id, config.service_request_id),
            operation: `merge`,
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
                data={MergeResponseKeysFormData(serviceRequests)}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
        </>
    );
}

export default MergeResponseKeysForm;