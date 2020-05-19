import Admin from '../../../views/layouts/Admin'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api-config'
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import Alert from "react-bootstrap/Alert";
import ProviderForm from "../../../views/components/Forms/ProviderForm";
import DeleteForm from "../../../views/components/Forms/DeleteForm";

export default class Properties extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            columns: [],
            query: {},
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
        this.deletePropertyTitle = "Delete Property";

        this.setTableColumns = this.setTableColumns.bind(this);
        this.setPropertyData = this.setPropertyData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.propertyModal = this.propertyModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
    }

    componentDidMount() {
        this.setState({
            query: {
                count: 10,
                order: "asc",
                sort: "property_name"
            }
        })
        this.setTableColumns()
        this.setPropertyData()
    }

    setPropertyData() {
        fetchData(ApiConfig.endpoints.properties, this.state.query).then((response) => {
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
                    cell: row => (
                        <div className={"controls"}>
                            <Button variant="outline-primary" size={"sm"} onClick={this.handleShow} data-property-id={row.id}
                                    data-modal-action={"update"}>
                                Edit
                            </Button>
                            <Button variant="outline-danger" size={"sm"} onClick={this.handleShow} data-property-id={row.id}
                                    data-modal-action={"delete"}>
                                Delete
                            </Button>
                        </div>
                    ),
                },
            ]
        });
    }

    formResponse(status, message, data = null) {
        let alertStatus;
        if (status === 200) {
            alertStatus = "success"
        } else {
            alertStatus = "danger"
        }
        this.setPropertyData();
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
        let propertyId = e.target.getAttribute("data-property-id");
        if (action === "create") {
            modalTitle = this.newPropertyTitle;
        } else if (action === "update") {
            modalTitle = this.updatePropertyTitle;
        } else if (action === "delete") {
            modalTitle = this.deletePropertyTitle;
        }
        this.setState({
            modal: {
                showModal: true,
                modalTitle: modalTitle,
                action: action,
                propertyId: propertyId
            }
        });
    }

    propertyModal() {
        let form = <PropertyForm formAction={this.state.modal.action} propertyId={this.state.modal.propertyId}
                                 formResponse={this.formResponse}/>
        if (this.state.modal.action === "delete") {
            let data = {
                property_id: this.state.modal.propertyId,
                endpoint: ApiConfig.endpoints.deleteProperty
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

    createPropertyButton() {
        return (
            <Button variant="primary" size={"sm"} onClick={this.handleShow} data-modal-action={"create"}>
                Add Property
            </Button>
        );
    }

    render() {

        return (
            <Admin>
                <>
                    {this.state.form.submitted &&
                    <Alert variant={this.state.form.alertStatus}>
                        {this.state.form.responseMessage}
                    </Alert>
                    }
                    <DataTable
                        title={this.createPropertyButton()}
                        columns={this.state.columns}
                        data={this.state.data}
                    />

                    <this.propertyModal/>
                </>
            </Admin>
        )
    }
}