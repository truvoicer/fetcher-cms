import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestResponseKeysFormData} from "../../../library/forms/service-request-response-keys-form";

const sprintf = require("sprintf-js").sprintf;

const RequestResponseKeysForm = ({data, config, formResponse}) => {

    const addButtonLabel = "Add Request Config";
    const updateButtonLabel = "Update Request Config";

    const [serviceRequestSelectData, setServiceRequestSelectData] = useState({
        response_key_request_item: {}
    });

    const [serviceRequestSelectOptions, setServiceRequestSelectOptions] = useState({
        response_key_request_item: []
    });

    const [returnDataTypeSelectData, setReturnDataTypeSelectData] = useState({
        return_data_type: {
            value: "text",
            label: "Text"
        }
    });

    const [returnDataTypeSelectOptions, setReturnDataTypeSelectOptions] = useState({
        return_data_type: [
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
        ],
    });

    const [requestResponseKey, setRequestResponseKey] = useState({});
    const [listData, setListData] = useState({
        array_keys: []
    });
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequest, config.provider_id),
            operation: `list`,
            data: {
                provider_id: config.provider_id
            },
            onSuccess: (responseData) => {
                setServiceRequestSelectOptions({
                    response_key_request_item: getServicesRequestsSelect(responseData.data)
                })
            }
        })
    }, [])
    useEffect(() => {
        if (isSet(data.action) && isSet(data.data.service_response_key) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.requestResponseKey, config.provider_id, config.service_request_id),
                operation: `${data.data.service_response_key.id}`,
                data: {
                    provider_id: config.provider_id
                },
                onSuccess: (responseData) => {
                    const data = responseData.data;
                    setRequestResponseKey(data);
                    if (isSet(data.return_data_type)) {
                        const returnDataType = getReturnDataType(data.return_data_type);
                        if (returnDataType !== null) {
                            setReturnDataTypeSelectData({
                                return_data_type: returnDataType
                            })
                        }
                    }
                    if (isSet(data.array_keys)) {
                        if (data.array_keys !== null && data.array_keys !== "") {
                            setListData({
                                array_keys: data.array_keys
                            });
                        }
                    }

                    if (isSet(data.response_key_request_item) &&
                        data.response_key_request_item !== null &&
                        isSet(data.response_key_request_item.service_request)
                    ) {
                        const serviceRequest = data.response_key_request_item.service_request;
                        setServiceRequestSelectData({
                            response_key_request_item: {
                                value: serviceRequest.id,
                                label: serviceRequest.service_request_label
                            }
                        });
                    }
                    setShowForm(true);
                }
            })
        }
    }, [data.itemId, data.action, data.data.service_response_key])

    const getServicesRequestsSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_request_label
            }
        })
    }

    const getReturnDataType = (data) => {
        if (isSet(data) && data !== "" && data !== null && data !== false) {
            return {
                value: data,
                label: uCaseFirst(data)
            }
        }
        return null;
    }

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        requestData.service_request_id = config.service_request_id;
        requestData.return_data_type = values.return_data_type.value;
        requestData.service_response_key = data.data.service_response_key;
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.requestResponseKey, config.provider_id, config.service_request_id),
            operation: data.action,
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            {data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestResponseKeysFormData(
                        true,
                        requestResponseKey
                    )
                }
                selectData={{
                    ...serviceRequestSelectData,
                    ...returnDataTypeSelectData
                }}
                selectOptions={{
                    ...serviceRequestSelectOptions,
                    ...returnDataTypeSelectOptions
                }}
                listData={listData}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={ServiceRequestResponseKeysFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                listData={listData}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default RequestResponseKeysForm;