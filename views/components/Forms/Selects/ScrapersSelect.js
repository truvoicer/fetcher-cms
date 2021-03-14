import React, {useEffect, useState} from 'react';
import {isNotEmpty} from "../../../../library/utils";
import Select from "react-select";
import {getScraperList} from "../../../../library/api/helpers/scraper-helpers";

const ScrapersSelect = ({provider = null, scraper = null, callback}) => {
    const [scraperList, setScraperList] = useState([])

    const setScrapers = () => {
        if (isNotEmpty(provider)) {
            getScraperList({
                providerId: provider.id,
                onSuccess: (responseData) => {
                    setScraperList(responseData)
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
        // console.log(scraper)
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
