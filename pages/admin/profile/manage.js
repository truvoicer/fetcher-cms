import Admin from '../../../views/layouts/Admin'
import React, {useState} from "react";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../../../views/components/Dropdowns/SettingsDropdown";
import {isObjectEmpty} from "../../../library/utils";
import {connect} from "react-redux";
import {SESSION_STATE_KEY, SESSION_USER} from "../../../library/redux/constants/session-constants";
import UserProfileForm from "../../../views/components/Forms/User/UserProfileForm";
import Modal from "react-bootstrap/Modal";
import ScraperSettings from "../../../views/components/Views/ScraperSettings";
import ApiTokensTable from "../../../views/components/Tables/ApiTokensTable";

export const UserProfilePageName = "user_profile";
const ManageUsers = ({session}) => {
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSize, setModalSize] = useState("md")
    const [modalComponent, setModalComponent] = useState(null)
    const [modalFooter, setModalFooter] = useState(false)
    const [modalFooterComponent, setModalFooterComponent] = useState(null)

    const getBreadcrumbsConfig = () => {
        return {
            pageName: UserProfilePageName
        }
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={UserProfilePageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    <Accordion defaultValue={"0"} activeKey={"0"}>
                        <div className="card">
                            <Accordion.Toggle
                                as={Card.Header}
                                eventKey="0"
                            >
                                <div className={"scrapers--header d-flex float-left align-items-center"}>
                                    <div className={"scrapers--header--title"}>
                                        User Profile
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
                                                        setModalSize("xl")
                                                        setModalTitle("Api Tokens")
                                                        setModalComponent(
                                                            <>
                                                                {!isObjectEmpty(session[SESSION_USER]) && (
                                                                    <ApiTokensTable
                                                                        userId={session[SESSION_USER].id}
                                                                    />
                                                                )}
                                                            </>
                                                        )
                                                        setShowModal(true)
                                                    }}
                                                >
                                                    API Tokens
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
                                    {!isObjectEmpty(session[SESSION_USER]) && (
                                        <UserProfileForm
                                            operation={"update_user_profile"}
                                            user={session[SESSION_USER]}
                                        />
                                    )}
                                </div>
                            </Accordion.Collapse>
                        </div>
                    </Accordion>
                </Col>
            </>
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
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(ManageUsers);