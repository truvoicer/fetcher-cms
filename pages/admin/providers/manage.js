import AdminLayout from '../../../layouts/AdminLayout'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api'
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ProviderForm from "../../../components/Forms/ProviderForm";
import Alert from "react-bootstrap/Alert";

export default class ManageProviders extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            columns: [],
            data: [],
            modal: {
                showModal: false,
                modalTitle: "",
                action: ""
            },
            form: {
                submitted: false,
                alertStatus: "",
                responseMessage: ""
            }
        }
        this.newProviderTitle = "New Provider";
        this.updateProviderTitle = "Update Provider";

        this.setTableColumns = this.setTableColumns.bind(this);
        this.setProviderData = this.setProviderData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.providerModal = this.providerModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
    }

    componentDidMount() {
        this.setTableColumns()
        this.setProviderData()
    }

    setProviderData() {
        let query = {
            count: 10,
            order: "asc",
            sort: "provider_name"
        };
        fetchData(ApiConfig.endpoints.providers, query).then((response) => {
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
                    cell: row =>
                        <Button variant="primary" size={"sm"} onClick={this.handleShow} data-modal-action={"update"}>
                            Edit
                        </Button>,
                },
            ]
        });
    }
    formResponse(status, message) {
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
        if(action === "new") {
            modalTitle = this.newProviderTitle;
        } else if (action === "update") {
            modalTitle = this.updateProviderTitle;
        }
        this.setState({
            modal: {
                showModal: true,
                modalTitle: modalTitle,
                action: action
            }
        });
    }

    providerModal() {
        return (
            <Modal show={this.state.modal.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProviderForm formAction={this.state.modal.action} formResponse={this.formResponse}/>
                </Modal.Body>
            </Modal>
        );
    }
    render() {

        return (
            <AdminLayout>
                <>
                    {this.state.form.submitted &&
                    <Alert variant={this.state.form.alertStatus}>
                        {this.state.form.responseMessage}
                    </Alert>
                    }
                    <Button variant="primary" size={"sm"} onClick={this.handleShow} data-modal-action={"new"}>
                        Add Provider
                    </Button>
                    <DataTable
                        title="Providers"
                        columns={this.state.columns}
                        data={this.state.data}
                    />

                    <this.providerModal/>
                </>
            </AdminLayout>
        )
    }
}