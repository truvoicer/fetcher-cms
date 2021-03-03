import Admin from '../../../views/layouts/Admin'
import ApiConfig from '../../../config/api-config'
import React, {createRef, useEffect, useRef, useState} from "react";
import Select from "react-select";
import {fetchData, fetchRequest, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import {isNotEmpty} from "../../../library/utils";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../../../views/components/Dropdowns/SettingsDropdown";
import ScraperForm from "../../../views/components/Forms/Scraper/ScraperForm";
import DataTable from "react-data-table-component";
import ScraperSettings from "../../../views/components/Views/ScraperSettings";
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card";
import ScraperApiJobs from "../../../views/components/Views/ScraperApiJobs";
import {connect} from "react-redux";
import {
    SCRAPER_API_STATE_KEY,
    SCRAPER_API_STATUS, SCRAPER_API_STATUS_OFFLINE,
    SCRAPER_API_STATUS_ONLINE
} from "../../../library/redux/constants/scraper-constants";
import {event} from "next/dist/build/output/log";
import ScraperSendJob from "../../../views/components/Views/ScraperSendJob";
import Button from "react-bootstrap/Button";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../library/redux/actions/breadcrumbs-actions";
import {ServiceRequestResponseKeysPageName} from "../providers/[provider_id]/requests/[service_request_id]/response-keys";


const ManageScrapers = ({scraperApi}) => {
    ManageScrapers.PageName = "manage_scrapers";
    setBreadcrumbsPageNameAction(ManageScrapers.PageName)

    const MANAGE_SCRAPER_JOBS_KEY = "manage_scraper_jobs";
    const MANAGE_SCRAPERS_KEY = "manage_scrapers";

    const [providerList, setProviderList] = useState([])
    const [scraperList, setScraperList] = useState([])
    const [selectedProvider, setSelectedProvider] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSize, setModalSize] = useState("md")
    const [modalComponent, setModalComponent] = useState(null)
    const [modalFooter, setModalFooter] = useState(false)
    const [modalFooterComponent, setModalFooterComponent] = useState(null)
    const [accordionItem, setAccordionItem] = useState(null)
    const toggleRef = createRef();

    const scraperColumns = [
        {
            name: 'Label',
            selector: 'scraper_label',
            sortable: true,
        },
        {
            name: 'Date Updated',
            selector: 'date_updated',
            sortable: true,
        },
        {
            name: 'Date Created',
            selector: 'date_created',
            sortable: true,
        },
        {
            name: "Controls",
            cell: row => {
                return (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Controls
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    setModalSize("xl")
                                    setModalTitle("Scraper Settings")
                                    setModalComponent(
                                        <ScraperSettings scraper={row} provider={selectedProvider}/>
                                    )
                                    setShowModal(true)
                                }}
                            >
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setModalSize("lg")
                                    setModalTitle("Send To Scraper Api")
                                    setModalFooterComponent(
                                        <>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setShowModal(false)
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    postRequest({
                                                        endpoint: ApiConfig.endpoints.scraper,
                                                        operation: `${row.id}/job/request`,
                                                        onSuccess: (responseData) => {
                                                            console.log(JSON.stringify(responseData.data))
                                                            setShowModal(false)
                                                        },
                                                        onError: (error) => {
                                                            console.error(error)
                                                        }
                                                    })
                                                }}
                                            >Execute Scraper Job</Button>
                                        </>
                                    )
                                    setModalFooter(true)
                                    setModalComponent(
                                        <ScraperSendJob scraper={row} provider={selectedProvider}/>
                                    )
                                    setShowModal(true)
                                }}
                            >
                                Execute Job
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )
            }
        }
    ];

    const setProviders = () => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.providerList,
            data: {
                count: 1000,
                order: "asc",
                sort: "provider_name"
            },
            onSuccess: (responseData) => {
                setProviderList(responseData.data)
            },
            onError: (error) => {
                console.error(error)
            },
        })
        return {
            endpoint: ApiConfig.endpoints.providerList,
            query: {
                count: 1000,
                order: "asc",
                sort: "provider_name"
            }
        };
    }

    const setScrapers = () => {
        if (isNotEmpty(selectedProvider)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.scraper,
                operation: "list",
                data: {
                    provider_id: selectedProvider.id,
                    count: 1000,
                    order: "asc",
                    sort: "scraperName"
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
        setProviders()
    }, [])

    useEffect(() => {
        setScrapers()
    }, [selectedProvider])

    return (
        <Admin pageName={ManageScrapers.PageName}>
            <div className={"scrapers"}>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <Accordion>
                            <div className="card">
                                <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="0"
                                >
                                    <div className={"scrapers--header d-flex float-left align-items-center"}>
                                        <div className={"scrapers--header--title"}>
                                            Scraper Api Jobs
                                        </div>
                                    </div>
                                    <div className="card-header-actions">
                                        {scraperApi[SCRAPER_API_STATUS] === SCRAPER_API_STATUS_ONLINE &&
                                        <span className="badge badge-pill badge-success">Online</span>
                                        }
                                        {scraperApi[SCRAPER_API_STATUS] === SCRAPER_API_STATUS_OFFLINE &&
                                        <span className="badge badge-pill badge-danger">Offline</span>
                                        }
                                        <div className={"scrapers--header d-flex float-left align-items-center"}>
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
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="card-body">
                                        <ScraperApiJobs

                                        />
                                    </div>
                                </Accordion.Collapse>
                            </div>
                            <div className="card">
                                <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="1"
                                    ref={toggleRef}
                                    onClick={(e) => {
                                        // if (!e.target.classList.contains("card-header")) {
                                        //     console.log("no card jead")
                                        //     e.preventDefault();
                                        //     e.stopPropagation()
                                        //     console.log(toggleRef)
                                        // } else {
                                        //     console.log("yes card jead")
                                        // }
                                    }}
                                >
                                    <div className={"scrapers--header d-flex float-left align-items-center"}>
                                        <div className={"scrapers--header--title"}>
                                            Manage Scrapers
                                        </div>
                                        <div className={"scrapers--header__select"}>
                                            <Select
                                                className={"scrapers-select"}
                                                options={providerList.map(provider => {
                                                    return {
                                                        value: provider.id,
                                                        label: provider.provider_label
                                                    }
                                                })}
                                                onChange={(e) => {
                                                    fetchRequest({
                                                        endpoint: ApiConfig.endpoints.provider,
                                                        args: [e.value],
                                                        onSuccess: (responseData) => {
                                                            setSelectedProvider(responseData.data)
                                                        },
                                                        onError: (error) => {
                                                            console.error(error)
                                                        },
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-header-actions">
                                        <div className={"scrapers--header d-flex float-left align-items-center"}>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                    as={SettingsDropdown}
                                                />
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            setModalComponent(
                                                                <ScraperForm
                                                                    provider={selectedProvider}
                                                                    operationData={"insert"}
                                                                />
                                                            );
                                                            setModalTitle("New Scraper")
                                                            setShowModal(true)
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
                                                    setScrapers()
                                                }}
                                            >
                                                <svg className="c-icon">
                                                    <use xlinkHref="/images/icons/sprites/free.svg#cil-reload"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                {isNotEmpty(selectedProvider) &&
                                                <div className="card">
                                                    <div className="card-header">Scrapers</div>
                                                    <div className="card-body">
                                                        <DataTable
                                                            className={"datalist"}
                                                            striped={true}
                                                            highlightOnHover={false}
                                                            responsive={true}
                                                            overflowY={true}
                                                            pagination={true}
                                                            paginationPerPage={100}
                                                            columns={scraperColumns}
                                                            data={scraperList}
                                                            expandableRows={true}
                                                        />
                                                    </div>
                                                </div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                </Accordion.Collapse>
                            </div>
                        </Accordion>
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
                {modalFooter &&
                <Modal.Footer>
                    {modalFooterComponent}
                </Modal.Footer>
                }
            </Modal>
        </Admin>
    )
}

function mapStateToProps(state) {
    return {
        scraperApi: state[SCRAPER_API_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(ManageScrapers);