import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {
    getScraperToken, scraperFetchRequest,
    scraperTokenCheck
} from "../../../library/api/scraper-api/scraper-middleware";
import {setScraperApiSession} from "../../../library/session/authenticate";
import {ScraperApiConfig} from "../../../config/scraper-api-config";
import {setScraperApiStatusAction} from "../../../library/redux/actions/scraper-actions";
import {
    SCRAPER_API_STATUS_OFFLINE,
    SCRAPER_API_STATUS_ONLINE
} from "../../../library/redux/constants/scraper-constants";

const ScraperApiJobs = () => {
    const AUTH_SUCCESS = "auth_success";
    const AUTH_FAIL = "auth_fail";
    const AUTH_USER_NOT_EXIST = "auth_user_not_exist";

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
                    setScraperApiStatusAction(SCRAPER_API_STATUS_ONLINE)
                    setScraperApiSession(responseData.data)
                    fetchCronJobs()
                }
            },
            onError: (error) => {
                setScraperApiStatusAction(SCRAPER_API_STATUS_OFFLINE)
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
                        setScraperApiStatusAction(SCRAPER_API_STATUS_ONLINE)
                        setScraperApiSession(responseData.data)
                        fetchCronJobs()
                        break;
                }
            },
            onError: (error) => {
                setScraperApiStatusAction(SCRAPER_API_STATUS_OFFLINE)
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
    // console.log(scraperList)
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
                                    {authStatus.status === AUTH_SUCCESS ?
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
                                        :
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
