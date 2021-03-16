import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceFormData} from "../../../library/forms/service-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceForm = ({data, formResponse}) => {
    const [service, setService] = useState({});
    const [showForm, setShowForm] = useState(false);

    const addButtonLabel = "Add Service";
    const updateButtonLabel = "Update Service";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.service,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setService(responseData.data);
                    setShowForm(true);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.service,
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
                    ServiceFormData(
                        true,
                        service.service_label,
                        service.service_name,
                    )
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={ServiceFormData()}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}
export default ServiceForm;
