import Admin from '../../../views/layouts/Admin'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api-config'
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ProviderForm from "../../../views/components/Forms/ProviderForm";
import Alert from "react-bootstrap/Alert";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class ManageProviders extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            columns: [],
            query: {},
            data: [],
            tableTitle: "",
            modal: {
                showModal: false,
                modalTitle: "",
                action: "",
                providerId: ""
            },
            form: {
                submitted: false,
                alertStatus: "",
                responseMessage: ""
            }
        }
        this.newProviderTitle = "New Provider";
        this.updateProviderTitle = "Update Provider";
        this.deleteProviderTitle = "Delete Provider";

        this.setTableColumns = this.setTableColumns.bind(this);
        this.setProviderData = this.setProviderData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.providerModal = this.providerModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
        this.newProviderButton = this.newProviderButton.bind(this);
    }

    componentDidMount() {
        this.setState({
            query: {
                count: 10,
                order: "asc",
                sort: "provider_name"
            }
        })
        this.setTableColumns()
        this.setProviderData()
    }

    setProviderData() {
        fetchData(ApiConfig.endpoints.providers, this.state.query).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    setTableColumns() {
        this.setState({
            columns: [
                {
                    name: 'Provider Name',
                    selector: 'provider_name',
                    sortable: true,
                },
                {
                    name: 'Api Base Url',
                    selector: 'provider_api_base_url',
                    sortable: true,
                    right: true,
                },
                {
                    name: 'Access key',
                    selector: 'provider_access_key',
                    sortable: true,
                    right: true,
                },
                {
                    name: 'Secret key',
                    selector: 'provider_secret_key',
                    sortable: true,
                    right: true,
                },
                {
                    name: 'Controls',
                    right: true,
                    cell: row => (
                        <div>
                            <Button variant="primary" size={"sm"} onClick={this.handleShow} data-provider-id={row.id}
                                    data-modal-action={"update"}>
                                Edit
                            </Button>
                            <Button variant="danger" size={"sm"} onClick={this.handleShow} data-provider-id={row.id}
                                    data-modal-action={"delete"}>
                                Delete
                            </Button>
                        </div>
                    )
                    ,
                },
            ]
        });
    }

    formResponse(status, message) {
        console.log(status, message);
        let alertStatus;
        if (status === 200) {
            alertStatus = "success"
        } else {
            alertStatus = "danger"
        }
        this.setState({
            form: {
                submitted: true,
                alertStatus: alertStatus,
                responseMessage: message
            }
        })
        this.setProviderData()
        this.handleClose();
    }

    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        })
    }

    handleShow(e) {
        let modalTitle;
        let action = e.target.getAttribute("data-modal-action");
        let providerId = e.target.getAttribute("data-provider-id");
        if (action === "create") {
            modalTitle = this.newProviderTitle;
        } else if (action === "update") {
            modalTitle = this.updateProviderTitle;
        } else if (action === "delete") {
            modalTitle = this.deleteProviderTitle;
        }
        this.setState({
            modal: {
                showModal: true,
                modalTitle: modalTitle,
                action: action,
                providerId: providerId
            }
        });
    }

    providerModal() {
        let form = <ProviderForm formAction={this.state.modal.action} providerId={this.state.modal.providerId}
                                 formResponse={this.formResponse}/>
        if (this.state.modal.action === "delete") {
            let data = {
                provider_id: this.state.modal.providerId,
                endpoint: ApiConfig.endpoints.deleteProvider
            };
            form = <DeleteForm data={data} formResponse={this.formResponse}/>
        }
        return (
            <Modal show={this.state.modal.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        );
    }
    newProviderButton() {
        return (
            <Button variant="primary" size={"sm"} onClick={this.handleShow}
                    data-modal-action={"create"}>
                Add Provider
            </Button>
        );
    }
    render() {
        return (
            <Admin>
                <>
                    <Row>
                        <Col sm={12} md={6} lg={9}>
                            {this.state.form.submitted &&
                            <Alert variant={this.state.form.alertStatus}>
                                {this.state.form.responseMessage}
                            </Alert>
                            }
                            <DataTable
                                title={this.newProviderButton()}
                                columns={this.state.columns}
                                data={this.state.data}
                            />

                            <this.providerModal/>
                        </Col>
                    </Row>
                </>
            </Admin>
        )
    }
}