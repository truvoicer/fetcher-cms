import {postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {
    getScraperConfigByScraperId
} from "../../../../library/api/helpers/scraper-helpers";
import {ScraperConfigFormData} from "../../../../library/forms/scraper-config-form";

const ConfigForm = ({provider = null, scraper = null}) => {

    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const [operation, setOperation] = useState("insert");
    const [scraperConfig, setScraperConfig] = useState(null);

    const saveButtonLabel = "Save";
    const updateButtonLabel = "Save";

    useEffect(() => {
        if (isNotEmpty(scraper)) {
            getScraperConfigByScraperId({
                scraperId: scraper.id,
                onSuccess: (responseData) => {
                    if (responseData.status === "success") {
                        setOperation("update")
                        setScraperConfig(scraperConfig => {
                            return responseData.data;
                        })
                    }
                },
                onError: (error) => {
                    console.error(error)
                },
            })
        }
    }, [provider, scraper])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (isNotEmpty(requestData?.client_type?.value)) {
            requestData.client_type = requestData.client_type.value;
        }
        requestData.scraper = {};
        requestData.scraper.id = scraper.id;
        if (operation === "update") {
            postRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: `config/${scraperConfig.id}/update`,
                requestData: requestData,
                onSuccess: (responseData) => {
                    setScraperConfig(responseData.data)
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
        } else {
            postRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: "config/create",
                requestData: requestData,
                onSuccess: (responseData) => {
                    setOperation("update")
                    setScraperConfig(responseData.data)
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
    }
    return (
        <>
            {response.show &&
                <div className={`alert alert-${response.variant}`} role="alert">
                    {response.message}
                </div>
            }

            <DataForm
                formType={"single"}
                data={ScraperConfigFormData(false, scraperConfig)}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
        </>
    );
}

export default ConfigForm;