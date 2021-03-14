import ApiConfig from '../../../config/api-config'
import {fetchRequest, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ProviderPropertyFormData} from "../../../library/forms/provider-property-form";

const sprintf = require("sprintf-js").sprintf;

const ProviderPropertiesForm = (props) => {

    const [providerProperty, setProviderProperty] = useState({});
    const [showForm, setShowForm] = useState(false);
    const updateButtonLabel = "Update Property";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.providerProperty, props.config.provider_id),
                operation: `${props.data.itemId}`,
                onSuccess: (responseData) => {
                    setProviderProperty(responseData.data);
                    setShowForm(true);
                }
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        requestData.provider_id = props.config.provider_id;
        if (props.data.action === "update") {
            requestData.property_id = providerProperty.property_id;
        }
        responseHandler(sendData(props.data.action, `provider/${requestData.provider_id}/property`, requestData), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ProviderPropertyFormData(
                        true,
                        providerProperty.property_value,
                    )
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
        </>
    );
}

export default ProviderPropertiesForm;