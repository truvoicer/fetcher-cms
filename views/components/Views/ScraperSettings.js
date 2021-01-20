import React, {useEffect, useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../Dropdowns/SettingsDropdown";
import Select from "react-select";
import {fetchRequest, postRequest} from "../../../library/api/middleware";
import ApiConfig from "../../../config/api-config";
import {error} from "next/dist/build/output/log";

const ScraperSettings = ({scraper = null}) => {
    const [responseKeys, setResponseKeys] = useState([])
    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.serviceResponseKeyList,
            data: {
                service_id: scraper.service.id
            },
            onSuccess: (responseData) => {
                console.log(responseData)
                setResponseKeys(responseData.data)
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }, [scraper])

    return (
        <div className={"scrapers--settings"}>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <div
                                className={"scrapers--header d-flex float-left align-items-center justify-content-between"}
                                style={{width: "100%"}}
                            >
                                <div className={"scrapers--header--title"}>
                                    {`${scraper.scraper_label} Settings`}
                                </div>
                                <div className="card-header-actions">
                                    <div className={"d-flex align-items-center"}>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                as={SettingsDropdown}
                                            />
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                    }}
                                                >
                                                    New Scraper
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <a
                                            className="card-header-action btn-minimize"
                                            href=""
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            <svg className="c-icon">
                                                <use xlinkHref="/images/icons/sprites/free.svg#cil-reload"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-5">

                                    <div className="card">
                                        <div className="card-header">Scrapers</div>
                                        <div className="card-body">
                                            <Select
                                                options={responseKeys.map(responseKey => {
                                                    return {
                                                        value: responseKey.id,
                                                        label: responseKey.key_name
                                                    }
                                                })}
                                                onChange={(e) => {
                                                    console.log(e)
                                                }}
                                            />
                                        </div>
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

export default ScraperSettings;
