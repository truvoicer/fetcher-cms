import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestResponseKeysFormData} from "../../../library/forms/service-request-response-keys-form";

const sprintf = require("sprintf-js").sprintf;

const RequestResponseKeysForm = (props) => {

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
        fetchData(sprintf(ApiConfig.endpoints.serviceRequestList), {provider_id: props.config.provider_id}).then((response) => {
            setServiceRequestSelectOptions({
                response_key_request_item: getServicesRequestsSelect(response.data.data)
            })
        })
    }, [])
    useEffect(() => {
        if (isSet(props.data.action) && isSet(props.data.data.service_response_key) && props.data.action === "update") {
            console.log(props.config)
            fetchData(sprintf(ApiConfig.endpoints.requestResponseKey, props.config.service_request_id, props.data.data.service_response_key.id))
                .then((response) => {
                    const data = response.data.data;
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
                })

        }
    }, [props.data.itemId, props.data.action, props.data.data.service_response_key])

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
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.service_request_id = props.config.service_request_id;
        values.return_data_type = values.return_data_type.value;
        values.service_response_key = props.data.data.service_response_key;
        responseHandler(sendData(props.data.action, "service/request/response/key", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
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
            {props.data.action !== "update" &&
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