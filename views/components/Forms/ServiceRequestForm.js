import ApiConfig from '../../../config/api-config'
import {
    fetchRequest,
    postRequest
} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestFormData} from "../../../library/forms/service-request-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceRequestForm = ({data, config, formResponse}) => {
    const [serviceRequest, setServiceRequest] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [servicesOptions, setServicesOptions] = useState({ services: [] });
    const [servicesData, setServicesData] = useState({ services: {} });
    const [categoryOptions, setCategoryOptions] = useState({ category: [] });
    const [categoryData, setCategoryData] = useState({ category: {} });

    const addButtonLabel = "Add Service Request";
    const updateButtonLabel = "Update Service Request";

    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.service,
            operation: `list`,
            onSuccess: (responseData) => {
                setServicesOptions({
                    services: getServicesSelect(responseData.data)
                })
            }
        })
        fetchRequest({
            endpoint: ApiConfig.endpoints.category,
            operation: `list`,
            onSuccess: (responseData) => {
                setCategoryOptions({
                    category: getCategoriesSelect(responseData.data)
                })
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
                    setServicesData({
                        services: {
                            value: responseData?.data?.service?.id,
                            label: responseData?.data?.service?.service_label
                        }
                    })
                    if (isSet(responseData.data.category) && responseData.data.category !== null) {
                        setCategoryData({
                            category: {
                                value: responseData?.data?.category?.id,
                                label: responseData?.data?.category?.category_label
                            }
                        })
                    }
                    setShowForm(true);
                }
            });
        }
    }, [data.itemId, data.action])

    const getServicesSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_label
            }
        })
    }

    const getCategoriesSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })
    }
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
            {data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestFormData(
                        true,
                        serviceRequest.service_request_name,
                        serviceRequest.service_request_label,
                    )
                }
                selectData={{
                    ...servicesData,
                    ...categoryData
                }}
                selectOptions={{
                    ...servicesOptions,
                    ...categoryOptions
                }}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={ServiceRequestFormData()}
                selectData={{
                    ...servicesData,
                    ...categoryData
                }}
                selectOptions={{
                    ...servicesOptions,
                    ...categoryOptions
                }}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default ServiceRequestForm;