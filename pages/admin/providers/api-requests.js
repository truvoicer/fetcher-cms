import Admin from "../../../views/layouts/Admin";
import Alert from "react-bootstrap/Alert";
import DataTable from "react-data-table-component";
import React from "react";
import {fetchData} from "../../../library/api/middleware";
import ApiConfig from "../../../config/api-config";
import Button from "react-bootstrap/Button";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import Modal from "react-bootstrap/Modal";
import RequestParamsForm from "../../../views/components/Forms/RequestParamsForm";


export default class ApiRequests extends React.Component {
    constructor(props) {
        super(props);
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
        this.deleteModalTitle = "Delete Api Request";
        this.modifyModalTitle = "Modify Api Request";
        this.handleClose = this.handleClose.bind(this);
        this.modifyParams = this.modifyParams.bind(this);
        this.deleteApiRequest = this.deleteApiRequest.bind(this);
        this.apiRequestModal = this.apiRequestModal.bind(this);
        this.setTableColumns = this.setTableColumns.bind(this);
        this.setPropertyData = this.setPropertyData.bind(this);
    }

    componentDidMount() {
        this.setState({
            query: {
                count: 10,
                order: "asc",
                sort: "api_request_name"
            }
        })
        this.setTableColumns()
        this.setPropertyData()
    }

    setPropertyData() {
        fetchData(ApiConfig.endpoints.apiRequests, this.state.query).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    setTableColumns() {
        this.setState({
            columns: [
                {
                    name: 'Request Name',
                    selector: 'api_request_name',
                    sortable: true,
                },
                {
                    name: 'Request Label',
                    selector: 'api_request_label',
                    sortable: true,
                },
                {
                    name: 'Provider',
                    selector: 'provider.provider_name',
                    sortable: true,
                },
                {
                    name: 'Controls',
                    right: true,
                    cell: row => (
                        <div className={"controls"}>
                            <Button variant="outline-primary" size={"sm"} onClick={this.modifyParams}
                                    data-provider-id={row.provider.id}
                                    data-api-request-id={row.id}
                                    data-modal-action={"update"}>
                                Modify Parameters
                            </Button>
                            <Button variant="outline-danger" size={"sm"} onClick={this.deleteApiRequest}
                                    data-api-request-id={row.id}
                                    data-modal-action={"delete"}>
                                Delete
                            </Button>
                        </div>
                    ),
                },
            ]
        });
    }
    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        })
    }
    modifyParams(e) {
        this.setState({
            modal: {
                action: e.target.getAttribute("data-modal-action"),
                requestId: e.target.getAttribute("data-api-request-id"),
                providerId: e.target.getAttribute("data-provider-id"),
                showModal: true,
                modalTitle: this.modifyModalTitle
            }
        })
    }

    deleteApiRequest(e) {
        this.setState({
            modal: {
                action: e.target.getAttribute("data-modal-action"),
                requestId: e.target.getAttribute("data-api-request-id"),
                showModal: true,
                modalTitle: this.deleteModalTitle
            }
        })
    }

    apiRequestModal() {
        let form = <RequestParamsForm formAction={this.state.modal.action}
                                      requestId={this.state.modal.requestId}
                                      providerId={this.state.modal.providerId}
                                 formResponse={this.formResponse}/>
        if (this.state.modal.action === "delete") {
            let data = {
                item_id: this.state.modal.requestId,
                endpoint: "request"
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
                        title="Requests"
                        columns={this.state.columns}
                        data={this.state.data}
                    />

                    <this.apiRequestModal/>
                </>
            </Admin>
        )
    }
}