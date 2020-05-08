import AdminLayout from '../../../layouts/AdminLayout'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api'
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import PropertyForm from "../../../components/Forms/PropertyForm";
import Alert from "react-bootstrap/Alert";

export default class ManageProperties extends React.Component {
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
        this.newPropertyTitle = "New Property";
        this.updatePropertyTitle = "Update Property";

        this.setTableColumns = this.setTableColumns.bind(this);
        this.setPropertyData = this.setPropertyData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.propertyModal = this.propertyModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
    }

    componentDidMount() {
        this.setTableColumns()
        this.setPropertyData()
    }

    setPropertyData() {
        let query = {
            count: 10,
            order: "asc",
            sort: "property_name"
        };
        fetchData(ApiConfig.endpoints.properties, query).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    setTableColumns() {
        this.setState({
            columns: [
                {
                    name: 'Property Name',
                    selector: 'property_name',
                    sortable: true,
                },
                {
                    name: 'Property label',
                    selector: 'property_label',
                    sortable: true,
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
        if(action === "new") {
            modalTitle = this.newPropertyTitle;
        } else if (action === "update") {
            modalTitle = this.updatePropertyTitle;
        }
        this.setState({
            modal: {
                showModal: true,
                modalTitle: modalTitle,
                action: action
            }
        });
    }

    propertyModal() {
        return (
            <Modal show={this.state.modal.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyForm formAction={this.state.modal.action} formResponse={this.formResponse}/>
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
                    <Button variant="primary" size={"sm"} onClick={this.handleShow} data-modal-action={"create"}>
                        Add Property
                    </Button>
                    <DataTable
                        title="Properties"
                        columns={this.state.columns}
                        data={this.state.data}
                    />

                    <this.propertyModal/>
                </>
            </AdminLayout>
        )
    }
}