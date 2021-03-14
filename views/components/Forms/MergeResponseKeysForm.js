import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestResponseKeysFormData} from "../../../library/forms/service-request-response-keys-form";
import {MergeResponseKeysFormData} from "../../../library/forms/merge-response-keys-form";

const sprintf = require("sprintf-js").sprintf;

const MergeResponseKeysForm = (props) => {

    const addButtonLabel = "Add Request Config";

    const [serviceRequestSelectData, setServiceRequestSelectData] = useState({
        source_service_request: {}
    });
    const [serviceRequestSelectOptions, setServiceRequestSelectOptions] = useState({
        source_service_request: []
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchData(
            sprintf(ApiConfig.endpoints.serviceRequest, props.config.provider_id, props.config.service_request_id),
            {
                provider_id: props.config.provider_id
            }).then((response) => {
            setServiceRequestSelectOptions({
                source_service_request: getServicesRequestsSelect(response.data.data)
            })
            setShowForm(true)
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
        values.destination_service_request_id = props.config.service_request_id;
        if (isSet(values.source_service_request) && isSet(values.source_service_request.value)) {
            values.source_service_request_id = values.source_service_request.value;
        }
        responseHandler(sendData("merge", "service/request/response-keys", values), props.formResponse);
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