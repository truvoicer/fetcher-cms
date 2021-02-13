import React, {useEffect, useState} from 'react';
import {
    fetchData,
    fetchRequest,
    postRequest,
    responseHandler,
    sendData
} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import {isNotEmpty, isSet} from "../../../../library/utils";
import DataForm from "../DataForm/DataForm";
import {ServiceRequestFormData} from "../../../../library/forms/service-request-form";
import {ScraperFormData} from "../../../../library/forms/scraper-form";
import {ScraperConfigFormData} from "../../../../library/forms/scraper-config-form";

const ScraperForm = ({provider = null, operationData = null, scraperData = null}) => {

    const [scraper, setScraper] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [servicesOptions, setServicesOptions] = useState([]);
    const [providerOptions, setProviderOptions] = useState([]);
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const [operation, setOperation] = useState("insert");

    const addButtonLabel = "Save";
    const updateButtonLabel = "Update";

    useEffect(() => {
        setOperation(operationData)
    }, [operationData])

    useEffect(() => {
        if (isNotEmpty(scraperData)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: scraperData.id,
                onSuccess: (responseData) => {
                    if (responseData.status === "success") {
                        setScraper(responseData.data)
                    }
                },
                onError: (error) => {
                    console.error(error)
                }
            })
        }
    }, [scraperData])

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            setServicesOptions(getServicesSelect(response.data.data))
        })
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            setProviderOptions(getProvidersSelect(response.data.data))
        })
    }, [])

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
        console.log(operation, values)
        values.service_id = values.service.value;
        values.provider_id = values.provider.value;
        if (operation === "update") {
            postRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: `${scraper.id}/update`,
                requestData: values,
                onSuccess: (responseData) => {
                    setScraper(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "success",
                        message: "Error"
                    })
                }
            })
        } else if (operation === "insert") {
            postRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: "create",
                requestData: values,
                onSuccess: (responseData) => {
                    setOperation("update")
                    setScraper(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "danger",
                        message: "Error"
                    })
                }
            })
        }
        else {
            console.error("Form operation not set")
        }
    }

    return (
        <>
            {/*{operation === "insert" && showForm  &&*/}
            {response.show &&
            <div className={`alert alert-${response.variant}`} role="alert">
                {response.message}
            </div>
            }
            <DataForm
                formType={"single"}
                data={ScraperFormData((operation === "update"), scraper, provider, servicesOptions, providerOptions)}
                submitCallback={submitHandler}
                submitButtonText={(operation === "update")? updateButtonLabel : addButtonLabel}
            />
            {/*}*/}
        </>
    );
};

export default ScraperForm;
