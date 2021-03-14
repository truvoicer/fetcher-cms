import ApiConfig from '../../../config/api-config'
import {fetchRequest, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceResponseKeyFormData} from "../../../library/forms/service-response-key-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceResponseKeysForm = (props) => {

    const [serviceResponseKey, setServiceResponseKey] = useState({});
    const [showForm, setShowForm] = useState(false);

    const addButtonLabel = "Add Response Key";
    const updateButtonLabel = "Update Response Key";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceResponseKey, props.config.service_id),
                operation: `${props.data.itemId}`,
                onSuccess: (responseData) => {
                    setServiceResponseKey(responseData.data);
                    setShowForm(true);
                }
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.service_id = props.config.service_id;
        responseHandler(sendData(props.data.action, "service/response/key", values),  props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceResponseKeyFormData(
                        true,
                        serviceResponseKey.key_name,
                        serviceResponseKey.key_value,
                    )
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceResponseKeyFormData()}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default ServiceResponseKeysForm;