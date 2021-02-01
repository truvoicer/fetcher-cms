import React, {useEffect, useState} from 'react';
import {fetchData, postRequest, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {isNotEmpty, isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestFormData} from "../../../library/forms/service-request-form";
import {ScraperFormData} from "../../../library/forms/scraper-form";

const ScraperForm = ({provider = null, operation = null, onSuccess}) => {

    const [serviceRequest, setServiceRequest] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [servicesOptions, setServicesOptions] = useState({services: []});
    const [servicesData, setServicesData] = useState({services: {}});
    const [providerOptions, setProviderOptions] = useState({provider: []});
    const [providerData, setProviderData] = useState({provider: {}});

    const addButtonLabel = "Save";
    const updateButtonLabel = "Update";

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            setServicesOptions({
                services: getServicesSelect(response.data.data)
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            setProviderOptions(providerOptions => {
                let dataClone = {...providerOptions};
                dataClone.provider = getProvidersSelect(response.data.data);
                return dataClone;
            })
        })
    }, [])

    useEffect(() => {
        if (isNotEmpty(provider)) {
            setProviderData(providerData => {
                let dataClone = {...providerData};
                dataClone.provider = {
                    value: provider.id,
                    label: provider.provider_label
                }
                return dataClone;
            })
        }
        setShowForm(true)
    }, [provider])

    const getServicesSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_label
            }
        })
    }

    const getProvidersSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.provider_label
            }
        })
    }
    const submitHandler = (values) => {
        values.service_id = values.services.value;
        values.provider_id = values.provider.value;
        postRequest({
            endpoint: ApiConfig.endpoints.scraper,
            operation: "create",
            requestData: values,
            onSuccess: (responseData) => {
                onSuccess(responseData.data)
            },
            onError: (error) => {

            }
        })
    }

    return (
        <>
            {operation === "insert" && showForm  &&
            <DataForm
                data={ScraperFormData()}
                selectData={{
                    ...servicesData,
                    ...providerData
                }}
                selectOptions={{
                    ...servicesOptions,
                    ...providerOptions
                }}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
};

export default ScraperForm;
