import Admin from '../../../views/layouts/Admin'
import ApiConfig from '../../../config/api-config'
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {fetchData, fetchRequest} from "../../../library/api/middleware";
import {isNotEmpty} from "../../../library/utils";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../../../views/components/Dropdowns/SettingsDropdown";
import ScraperForm from "../../../views/components/Forms/ScraperForm";
import DataTable from "react-data-table-component";
import ScraperSettings from "../../../views/components/Views/ScraperSettings";


const ManageScrapers = (props) => {
    ManageScrapers.PageName = "manage_scrapers";
    const getBreadcrumbsConfig = () => {
        return {
            pageName: ManageScrapers.PageName,
        }
    }

    const [providerList, setProviderList] = useState([])
    const [scraperList, setScraperList] = useState([])
    const [selectedProvider, setSelectedProvider] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSize, setModalSize] = useState("md")
    const [modalComponent, setModalComponent] = useState(null)

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
                                        <ScraperSettings scraper={row} />
                                    )
                                    setShowModal(true)
                                }}
                            >
                                Settings
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
        setProviders()
    }, [])

    useEffect(() => {
        setScrapers()
    }, [selectedProvider])

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ManageScrapers.PageName}>
            <div className={"scrapers"}>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className={"scrapers--header d-flex float-left align-items-center"}>
                                    <div className={"scrapers--header--title"}>
                                        Manage Scrapers
                                    </div>
                                    <div className={"scrapers--header__select"}>
                                        <Select
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
                                                                operation={"insert"}
                                                                onSuccess={(data) => {
                                                                    setScraperList(data)
                                                                    setShowModal(false)
                                                                    setModalTitle("")
                                                                    setModalComponent(null)
                                                                }}
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
                            </div>
                            {isNotEmpty(selectedProvider) &&
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
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
                                    </div>

                                </div>
                            </div>
                            }
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
        </Admin>
    )
}
export default ManageScrapers;