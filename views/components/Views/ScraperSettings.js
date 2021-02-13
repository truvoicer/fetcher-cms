import React, {useEffect, useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../Dropdowns/SettingsDropdown";
import Select from "react-select";
import {fetchRequest, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {isNotEmpty} from "../../../library/utils";
import ScrapersSelect from "../Forms/Selects/ScrapersSelect";
import Modal from "react-bootstrap/Modal";
import ScheduleForm from "../Forms/Scraper/ScheduleForm";
import ConfigForm from "../Forms/Scraper/ConfigForm";
import ScraperForm from "../Forms/Scraper/ScraperForm";

const ScraperSettings = ({scraper = null, provider = null}) => {
    const [responseKeys, setResponseKeys] = useState([])
    const [selectedScraper, setSelectedScraper] = useState(null)
    const [selectedResponseKey, setSelectedResponseKey] = useState(null)
    const [scraperResponseKey, setScraperResponseKey] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSize, setModalSize] = useState("md")
    const [modalComponent, setModalComponent] = useState(null)
    const [responseKeySelectorValue, setResponseKeySelectorValue] = useState("")
    const [responseKeySelectorRequest, setResponseKeySelectorRequest] = useState({
        status: "",
        message: ""
    })

    const responseKeySelectorFormHandler = (e) => {
        e.preventDefault();
        let endpoint;
        if (!isNotEmpty(scraperResponseKey) || (Array.isArray(scraperResponseKey) && scraperResponseKey.length === 0)) {
            endpoint = `${scraper.id}/response-key/${selectedResponseKey.value}/create`;
        } else {
            endpoint = `/response-key/${scraperResponseKey.id}/update`;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.scraper,
            operation: endpoint,
            requestData: {
                response_key_selector: responseKeySelectorValue
            },
            onSuccess: (responseData) => {
                setResponseKeySelectorRequest({
                    status: "success",
                    message: "Saved"
                })
            },
            onError: (error) => {
                setResponseKeySelectorRequest({
                    status: "error",
                    message: "Error"
                })
                console.error(error)
            }
        })
    }

    const fetchServiceResponseKeys = (serviceId) => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.serviceResponseKeyList,
            data: {
                service_id: serviceId
            },
            onSuccess: (responseData) => {
                setResponseKeys(responseData.data)
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        if (isNotEmpty(scraper)) {
            setSelectedScraper(scraper)
            fetchServiceResponseKeys(scraper.service.id)
        }
    }, [scraper])

    useEffect(() => {
        if (isNotEmpty(selectedResponseKey)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: `${scraper.id}/response-key/${selectedResponseKey.value}`,
                onSuccess: (responseData) => {
                    setScraperResponseKey(responseData.data)

                    if (!isNotEmpty(responseData?.data) ||
                        (Array.isArray(responseData.data) && responseData.data.length === 0)
                    ) {
                        setResponseKeySelectorValue("")
                    } else {
                        setResponseKeySelectorValue(responseData.data.response_key_selector)
                    }
                },
                onError: (error) => {
                    console.error(error)
                }
            })
        }
    }, [selectedResponseKey])
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
                                                        setModalSize("md")
                                                        setModalTitle("Edit Scraper")
                                                        setModalComponent(
                                                            <ScraperForm
                                                                provider={provider}
                                                                scraperData={scraper}
                                                                operationData={"update"}
                                                            />
                                                        )
                                                        setShowModal(true)
                                                    }}
                                                >
                                                    Edit Scraper
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setModalSize("md")
                                                        setModalTitle("Scraper Schedule Options")
                                                        setModalComponent(
                                                            <ScheduleForm
                                                                scraper={scraper}
                                                                provider={provider}
                                                            />
                                                        )
                                                        setShowModal(true)
                                                    }}
                                                >
                                                    Edit Schedule
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
                                        <div className="card-header">Select a Scraper</div>
                                        <div className="card-body">
                                            <ScrapersSelect
                                                scraper={scraper}
                                                provider={provider}
                                                callback={(data) => {
                                                    fetchServiceResponseKeys(data.service.id)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="card">
                                        <div className="card-header">Select a Response Key</div>
                                        <div className="card-body">
                                            <Select
                                                options={responseKeys.map(responseKey => {
                                                    return {
                                                        value: responseKey.id,
                                                        label: responseKey.key_name
                                                    }
                                                })}
                                                onChange={(e) => {
                                                    setSelectedResponseKey(e)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isNotEmpty(selectedResponseKey) &&
                                <div className="col-sm-12 col-md-3">
                                    <form onSubmit={responseKeySelectorFormHandler}>
                                        <div className="card">
                                            <div className="card-header">
                                                <div
                                                    className={"scrapers--header d-flex float-left align-items-center"}>
                                                    <div className={"scrapers--header--title"}>
                                                        Key Name
                                                    </div>
                                                </div>
                                                <div className="card-header-actions">
                                                    {responseKeySelectorRequest.status === "success" &&
                                                    <span
                                                        className={"text-success mr-4"}>{responseKeySelectorRequest.message}</span>
                                                    }
                                                    {responseKeySelectorRequest.status === "error" &&
                                                    <span
                                                        className={"text-danger mr-4"}>{responseKeySelectorRequest.message}</span>
                                                    }
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className={"d-flex"}>
                                                    {selectedResponseKey?.label &&
                                                    <div>
                                                        <p>{selectedResponseKey.label}</p>
                                                    </div>
                                                    }
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter response key selector"
                                                    onChange={(event) => {
                                                        setResponseKeySelectorValue(event.target.value)
                                                    }}
                                                    value={responseKeySelectorValue}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="card">
                                        <div className="card-header">Configuration</div>
                                        <div className="card-body">
                                            <ConfigForm
                                                scraper={scraper}
                                                provider={provider}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                size={modalSize}
                onHide={() => {
                    setShowModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalComponent}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ScraperSettings;
