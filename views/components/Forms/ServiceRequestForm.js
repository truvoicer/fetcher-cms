import ApiConfig from '../../../config/api-config'
import {fetchRequest, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestFormData} from "../../../library/forms/service-request-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceRequestForm = (props) => {
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
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchRequest({
                endpoint: sprintf(ApiConfig.endpoints.serviceRequest, props.config.provider_id),
                operation: `${props.data.itemId}`,
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
    }, [props.data.itemId, props.data.action])

    const getServicesSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_label
            }
        })
    }

    const getCategoriesSelect = (data) => {
        // if (!isSet(data.category)) {
        //     return {};
        // }
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })
    }
    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.provider_id = props.config.provider_id;
        values.services.id = values.services.value;
        values.category.id = values.category.value;
        responseHandler(sendData(props.data.action, "service/request", values), props.formResponse);
    }
    return (
        <>
            {props.data.action === "update" && showForm &&
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
            {props.data.action !== "update" &&
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