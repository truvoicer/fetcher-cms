import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {MergeResponseKeysFormData} from "../../../library/forms/merge-response-keys-form";

const sprintf = require("sprintf-js").sprintf;

const MergeResponseKeysForm = ({data, config, formResponse}) => {

    const addButtonLabel = "Add Request Config";

    const [serviceRequestSelectData, setServiceRequestSelectData] = useState({
        source_service_request: {}
    });
    const [serviceRequestSelectOptions, setServiceRequestSelectOptions] = useState({
        source_service_request: []
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequest, config.provider_id),
            operation: `${config.service_request_id}`,
            data: {
                provider_id: config.provider_id
            },
            onSuccess: (responseData) => {
                setServiceRequestSelectOptions({
                    source_service_request: getServicesRequestsSelect(responseData.data)
                })
                setShowForm(true)
            }
        })
    }, [])

    const getServicesRequestsSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_request_label
            }
        })
    }

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
            {showForm &&
            <DataForm
                data={MergeResponseKeysFormData()}
                selectData={serviceRequestSelectData}
                selectOptions={serviceRequestSelectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default MergeResponseKeysForm;