import React, {useEffect, useState} from 'react';
import {isNotEmpty} from "../../../../library/utils";
import {fetchRequest} from "../../../../library/api/middleware";
import ApiConfig from "../../../../config/api-config";
import Select from "react-select";

const ScrapersSelect = ({provider = null, scraper = null, callback}) => {
    const [scraperList, setScraperList] = useState([])

    const setScrapers = () => {
        if (isNotEmpty(provider)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: "list",
                data: {
                    provider_id: provider.id,
                    count: 1000,
                    order: "asc",
                    sort: "scraper_name"
                },
                onSuccess: (responseData) => {
                    setScraperList(responseData.data)
                },
                onError: (error) => {
                    console.error(error)
                },
            })
        }
    }


    useEffect(() => {
        setScrapers()
    }, [provider])

    const getExtraProps = () => {
        console.log(scraper)
        if (isNotEmpty(scraper)) {
            return {
                value: {
                    value: scraper.id,
                    label: scraper.scraper_label
                }
            }
        }
        return {};
    }
    return (
        <div>
            <Select
                {...getExtraProps()}
                options={scraperList.map(scraper => {
                    return {
                        value: scraper.id,
                        label: scraper.scraper_label
                    }
                })}
                onChange={(e) => {
                    const getScraper = scraperList.find(item => item.id === e.value);
                    callback(getScraper)
                }}
            />
        </div>
    );
};

export default ScrapersSelect;
