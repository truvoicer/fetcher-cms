import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import DataForm from "./DataForm/DataForm";
import {ServiceFormData} from "../../../library/forms/service-form";

const ServiceForm = ({data, formResponse}) => {
    const [service, setService] = useState({});

    const addButtonLabel = "Add Service";
    const updateButtonLabel = "Update Service";

    useEffect(() => {
        if (data?.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.service,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setService(responseData.data);
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
            <DataForm
                formType={"single"}
                data={ServiceFormData((data.action === "update"), service)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}
export default ServiceForm;
