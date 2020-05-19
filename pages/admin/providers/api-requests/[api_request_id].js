import Router from "next/router";
import {fetchData, responseHandler} from "../../../../library/api/middleware";
import ApiConfig from "../../../../config/api-config";
import React from "react";
import Admin from "../../../../views/layouts/Admin";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import RequestParamsForm from "../../../../views/components/Forms/RequestParamsForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import Modal from "react-bootstrap/Modal";

class ApiRequestParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRequestId: 3,
            providerId: 11,
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
        this.deleteModalTitle = "Delete Parameter";
        this.modifyModalTitle = "Modify Parameter";
        this.setTableColumns = this.setTableColumns.bind(this);
        this.setData = this.setData.bind(this);
        this.modal = this.modal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.modifyParams = this.modifyParams.bind(this);
        this.deleteParam = this.deleteParam.bind(this);
    }

    componentDidMount() {
        const {api_request_id} = Router.query;
        // this.setState({
        //     apiRequestId: 3,
        //     query: {
        //         count: 10,
        //         order: "asc",
        //         sort: "parameter_name",
        //         provider_id: 11,
        //         api_request_id: 3
        //     }
        // })
        this.setTableColumns()
        this.setData()
    }


    setData() {
        fetchData(ApiConfig.endpoints.apiProviderRequestParameterList, {
            count: 10,
            order: "asc",
            sort: "parameter_name",
            provider_id: 11,
            api_request_id: 3
        }).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    setTableColumns() {
        this.setState({
            columns: [
                {
                    name: 'Parameter Name',
                    selector: 'parameter_name',
                    sortable: true,
                },
                {
                    name: 'Parameter Value',
                    selector: 'parameter_value',
                    sortable: true,
                },
                {
                    name: 'Controls',
                    right: true,
                    cell: row => (
                        <div className={"controls"}>
                            <Button variant="outline-primary" size={"sm"} onClick={this.modifyParams}
                                    data-parameter-id={row.id}
                                    data-modal-action={"update"}>
                                Modify Parameter
                            </Button>
                            <Button variant="outline-danger" size={"sm"} onClick={this.deleteParam}
                                    data-parameter-id={row.id}
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
                parameterId: e.target.getAttribute("data-parameter-id"),
                showModal: true,
                modalTitle: this.modifyModalTitle
            }
        })
    }

    deleteParam(e) {
        this.setState({
            modal: {
                action: e.target.getAttribute("data-modal-action"),
                parameterId: e.target.getAttribute("data-parameter-id"),
                showModal: true,
                modalTitle: this.deleteModalTitle
            }
        })
    }
    modal() {
        let form = <RequestParamsForm formAction={this.state.modal.action}
                                      parameterId={this.state.modal.parameterId}
                                      formResponse={this.formResponse}/>
        if (this.state.modal.action === "delete") {
            let data = {
                item_id: this.state.modal.parameterId,
                endpoint: "request/parameters"
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
                    <DataTable
                        title="Requests"
                        columns={this.state.columns}
                        data={this.state.data}
                    />
                    <this.modal/>
                </>
            </Admin>
        )
    }
}

export default ApiRequestParameters;