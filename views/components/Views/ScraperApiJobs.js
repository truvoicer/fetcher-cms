import React, {useContext, useEffect, useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../Dropdowns/SettingsDropdown";
import Select from "react-select";
import {fetchRequest, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {error} from "next/dist/build/output/log";
import {isNotEmpty} from "../../../library/utils";
import ScrapersSelect from "../Forms/Selects/ScrapersSelect";
import Modal from "react-bootstrap/Modal";
import Admin from "../../layouts/Admin";
import ScheduleForm from "../Forms/Scraper/ScheduleForm";
import {UserContext} from "../Context/UserContext";
import {
    getScraperToken, scraperFetchRequest,
    scraperTokenCheck,
    scraperTokenRequest
} from "../../../library/api/scraper-api/scraper-middleware";
import {setScraperApiSession} from "../../../library/session/authenticate";
import {ScraperApiConfig} from "../../../config/scraper-api-config";

const ScraperApiJobs = () => {
    const AUTH_SUCCESS = "auth_success";
    const AUTH_FAIL = "auth_fail";
    const AUTH_USER_NOT_EXIST = "auth_user_not_exist";

    const [responseKeys, setResponseKeys] = useState([])
    const [selectedScraper, setSelectedScraper] = useState(null)
    const [scraperList, setScraperList] = useState([])
    const [authStatus, setAuthStatus] = useState({
        status: "",
        message: ""
    })
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSize, setModalSize] = useState("md")
    const [modalComponent, setModalComponent] = useState(null)

    const fetchCronJobs = () => {
        scraperFetchRequest({
            endpoint: ScraperApiConfig.endpoints.cron,
            operation: "list",
            onSuccess: (responseData) => {
                if (responseData?.status === "success") {
                    setAuthStatus({
                        status: AUTH_SUCCESS,
                        message: responseData.message
                    })
                    setScraperList(responseData.data)
                }
            },
            onError: (error) => {

            }
        })
    }

    const requestToken = () => {
        getScraperToken({
            onSuccess: (responseData) => {
                if (responseData?.status === "success") {
                    setScraperApiSession(responseData.data)
                    fetchCronJobs()
                }
            },
            onError: (error) => {

            }
        })
    }

    useEffect(() => {
        scraperTokenCheck({
            onSuccess: (responseData) => {
                switch (responseData?.status) {
                    case "success":
                        setAuthStatus({
                            status: AUTH_SUCCESS,
                            message: responseData.message
                        })
                        fetchCronJobs()
                        break;
                }
            },
            onError: (error) => {
                switch (error?.status) {
                    case "cron_user_not_exist":
                        setAuthStatus({
                            status: AUTH_USER_NOT_EXIST,
                            message: error.message
                        })
                        break;
                    default:
                        setAuthStatus({
                            status: AUTH_FAIL,
                            message: error.message
                        })
                        break;
                }
            }
        })
    }, [])
    console.log(scraperList)
    return (
        <div className={"scrapers--settings"}>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            Scraper Cron Jobs
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    {authStatus.status === AUTH_FAIL &&
                                    <>
                                    <p>error</p>
                                    </>

                                    }
                                    {authStatus.status === AUTH_USER_NOT_EXIST &&
                                    <>
                                        <p className={"text-danger"}>{authStatus.message}</p>
                                        <button
                                            className="btn btn-outline-primary btn-lg btn-block"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                requestToken()
                                            }}
                                        >
                                            Connect to Cron Api
                                        </button>
                                    </>
                                    }
                                    {authStatus.status === AUTH_SUCCESS &&
                                        <>
                                            <p>success</p>
                                        {/*<DataTable*/}
                                        {/*    className={"datalist"}*/}
                                        {/*    striped={true}*/}
                                        {/*    highlightOnHover={false}*/}
                                        {/*    responsive={true}*/}
                                        {/*    overflowY={true}*/}
                                        {/*    pagination={true}*/}
                                        {/*    paginationPerPage={100}*/}
                                        {/*    columns={scraperColumns}*/}
                                        {/*    data={scraperList}*/}
                                        {/*    expandableRows={true}*/}
                                        {/*/>*/}
                                        </>
                                    }
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

export default ScraperApiJobs;
