import React, {useEffect, useState} from 'react';
import {getScraperConfigByScraperId, getScraperScheduleByScraperId} from "../../../library/api/helpers/scraper-helpers";
import {fetchRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {formatDate, isNotEmpty, isObject} from "../../../library/utils";
import {ScraperScheduleFormData} from "../../../library/forms/scraper-schedule-form";
import {ScraperConfigFormData} from "../../../library/forms/scraper-config-form";

const ScraperSendJob = ({provider = null, scraper = null}) => {

    const [scraperSchedule, setScraperSchedule] = useState(null);
    const [responseKeys, setResponseKeys] = useState([])
    const [scraperConfig, setScraperConfig] = useState(null);


    useEffect(() => {
        if (isNotEmpty(scraper)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: `${scraper.id}/response-key/list`,
                onSuccess: (responseData) => {
                    setResponseKeys(responseData.data)
                },
                onError: (error) => {
                    console.error(error)
                }
            })
            getScraperScheduleByScraperId({
                scraperId: scraper.id,
                onSuccess: (responseData) => {
                    if (responseData.status === "success") {
                        setScraperSchedule(scraperSchedule => {
                            return responseData.data;
                        })
                    }
                },
                onError: (error) => {
                    console.error(error)
                },
            })
            getScraperConfigByScraperId({
                scraperId: scraper.id,
                onSuccess: (responseData) => {
                    if (responseData.status === "success") {
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
    }, [scraper])

    const getValue = (field) => {
        if (isObject(field.value)) {
            return field?.value?.label
        }
        if (field.value === false) {
            return "False"
        }
        if (field.value === true) {
            return "True"
        }
        if (field.fieldType === "date") {
            return formatDate(field.value)
        }
        return field.value
    }
    const scheduleFields = ScraperScheduleFormData(false, scraperSchedule, scraper)?.fields;
    const configFields = ScraperConfigFormData(false, scraperConfig)?.fields;

    return (
        <div className={"scrapers--send-job"}>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            Job Preview
                        </div>
                        <div className={"card-body"}>

                            <div className="card">
                                <div className="card-header">
                                    Response Keys
                                </div>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        {responseKeys.map((responseKey, index) => (
                                            <div className={"col-12 col-md-6 col-lg-6"} key={index}>
                                                <span className={"label text-primary"}>{index + 1}</span>
                                                <span className={"fw-bold ml-2"}>Key Name:</span>
                                                <span
                                                    className={"ml-2"}>[{responseKey.service_response_key.key_name}]</span>

                                                <span className={"label ml-2"}>Selector:</span>
                                                <span className={"ml-2"}>[{responseKey.response_key_selector}]</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Schedule
                                </div>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        {isNotEmpty(scheduleFields) && scheduleFields.map((field, index) => (
                                            <div className={"col-12 col-md-6 col-lg-3"} key={index}>
                                                <span className={"label fw-bold ml-2"}>{field.label}</span>
                                                <br/>
                                                <span
                                                    className={"ml-2"}>
                                                    {getValue(field)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Config
                                </div>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        {isNotEmpty(configFields) && configFields.map((field, index) => (
                                            <div className={"col-12 col-md-6 col-lg-3"} key={index}>
                                                <span className={"label fw-bold ml-2"}>{field.label}</span>
                                                <br/>
                                                <span
                                                    className={"ml-2"}>
                                                    {getValue(field)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScraperSendJob;
