import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm/DataForm";
import {ServiceRequestFormData} from "../../../library/forms/service-request-form";
import {
    buildCategoriesSelectOptions,
    buildServicesSelectOptions,
} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const ServiceRequestForm = ({data, config, formResponse}) => {
    const [serviceRequest, setServiceRequest] = useState({});
    const [services, setServices] = useState({ services: [] });
    const [categories, setCategories] = useState({ category: [] });

    const addButtonLabel = "Add Service Request";
    const updateButtonLabel = "Update Service Request";

    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.service,
            operation: `list`,
            onSuccess: (responseData) => {
                setServices(buildServicesSelectOptions(responseData.data))
            }
        })
        fetchRequest({
            endpoint: ApiConfig.endpoints.category,
            operation: `list`,
            onSuccess: (responseData) => {
                setCategories(buildCategoriesSelectOptions(responseData.data))
            }
        })
    }, [])

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceRequest, config.provider_id),
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setServiceRequest(responseData.data);
                }
            });
        }
    }, [data.itemId, data.action])


    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        requestData.provider_id = config.provider_id;
        requestData.service_id = values.services.value;
        requestData.category.id = values.category.value;
        postRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequest, config.provider_id),
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
                data={ServiceRequestFormData((data.action === "update"), serviceRequest, services, categories)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}

export default ServiceRequestForm;