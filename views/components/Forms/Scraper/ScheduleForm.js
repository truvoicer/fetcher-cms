import {postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {
    getScraperList,
    getScraperScheduleByScraperId
} from "../../../../library/api/helpers/scraper-helpers";
import {ScraperScheduleFormData} from "../../../../library/forms/scraper-schedule-form";

const ScheduleForm = ({provider = null, scraper = null}) => {

    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const [operation, setOperation] = useState("insert");
    const [scraperSchedule, setScraperSchedule] = useState(null);
    const [scraperList, setScraperList] = useState([]);

    const saveButtonLabel = "Save";
    const updateButtonLabel = "Save";

    useEffect(() => {
        if (isNotEmpty(provider)) {
            getScraperList({
                providerId: provider.id,
                onSuccess: (responseData) => {
                    if (Array.isArray(responseData)) {
                        setScraperList(scraperList => {
                            return responseData.map(scraperItem => {
                                return {
                                    value: scraperItem.id,
                                    label: scraperItem.scraper_label
                                }
                            });
                        })
                    }
                    // setShowForm(true);
                },
                onError: (error) => {
                    console.error(error)
                },
            })
        }
        if (isNotEmpty(scraper)) {
            getScraperScheduleByScraperId({
                scraperId: scraper.id,
                onSuccess: (responseData) => {
                    if (responseData.status === "success") {
                        setOperation("update")
                        setScraperSchedule(scraperSchedule => {
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
        if (isNotEmpty(requestData?.scraper?.value) && !isNaN(requestData.scraper.value)) {
            requestData.scraper.id = requestData.scraper.value;
        }
        if (isNotEmpty(requestData?.month?.value)) {
            requestData.month = requestData.month.value;
        }
        if (isNotEmpty(requestData?.weekday?.value)) {
            requestData.weekday = requestData.weekday.value;
        }
        if (operation === "update") {
            postRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: `schedule/${scraperSchedule.id}/update`,
                requestData: requestData,
                onSuccess: (responseData) => {
                    setScraperSchedule(responseData.data)
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
                operation: "schedule/create",
                requestData: requestData,
                onSuccess: (responseData) => {
                    setOperation("update")
                    setScraperSchedule(responseData.data)
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
                data={ScraperScheduleFormData(false, scraperSchedule, scraper, scraperList)}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
        </>
    );
}

export default ScheduleForm;