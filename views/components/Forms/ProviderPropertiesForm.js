import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest,
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ProviderPropertyFormData} from "../../../library/forms/provider-property-form";

const sprintf = require("sprintf-js").sprintf;

const ProviderPropertiesForm = ({data, config, formResponse}) => {
    const [providerProperty, setProviderProperty] = useState({});
    const updateButtonLabel = "Update Property";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.providerProperty, config.provider_id),
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setProviderProperty(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        requestData.provider_id = config.provider_id;
        if (data.action === "update") {
            requestData.property_id = providerProperty.property_id;
        }
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.providerProperty, config.provider_id),
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
                data={ProviderPropertyFormData((data.action === "update"), providerProperty)}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
        </>
    );
}

export default ProviderPropertiesForm;