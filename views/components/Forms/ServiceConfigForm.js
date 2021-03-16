import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest,
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestConfigFormData} from "../../../library/forms/service-request-config-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceConfigForm = ({data, config, formResponse}) => {

    const addButtonLabel = "Add Request Config";
    const updateButtonLabel = "Update Request Config";

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
                label: "List",
                value: "list"
            }
        ],
    });

    const [serviceRequestConfig, setServiceRequestConfig] = useState({});
    const [listData, setListData] = useState({
        item_array_value: []
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, config.provider_id, config.service_request_id),
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    let data = responseData.data;
                    setServiceRequestConfig(responseData.data);
                    setSelectData({
                        value_types: getSelectedValueType(data.value_type)
                    })
                    if (data.item_array_value !== null && data.item_array_value !== "") {
                        setListData({
                            item_array_value: data.item_array_value
                        });
                    }
                    setShowForm(true);
                }
            });
        }
    }, [data.itemId, data.action])

    const getSelectedValueType = (value_type) => {
        if (isSet(value_type) && value_type !== "") {
            return {
                value: value_type,
                label: uCaseFirst(value_type)
            }
        }
    }

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
            {data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestConfigFormData(
                        true,
                        serviceRequestConfig.item_name,
                        serviceRequestConfig.item_value,
                    )
                }
                selectData={selectData}
                selectOptions={selectOptions}
                listData={listData}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={ServiceRequestConfigFormData()}
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

export default ServiceConfigForm;