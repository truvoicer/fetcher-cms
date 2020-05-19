import Router from "next/router";
import {fetchData, responseHandler} from "../../../../library/api/middleware";
import ApiConfig from "../../../../config/api-config";
import React from "react";
import Admin from "../../../../views/layouts/Admin";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Button from "react-bootstrap/Button";

class ApiRequestParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRequestId: "",
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
        this.setTableColumns = this.setTableColumns.bind(this);
        this.setData = this.setData.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const {api_request_id} = Router.query;
        this.setState({
            apiRequestId: api_request_id,
            query: {
                count: 10,
                order: "asc",
                sort: "parameter_name",
                provider_id: 11,
                api_request_id: 3
            }
        })
        this.setTableColumns()
        this.setData()
    }


    setData() {
        fetchData(ApiConfig.endpoints.apiProviderRequestParams, {
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
                            <Link href={"/admin/providers/api-requests/" + row.id}>
                                <a className={"btn btn-outline-primary btn-sm"}>
                                    Modify Parameters
                                </a>
                            </Link>
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
    render() {
        return (
            <Admin>
                <>
                    <DataTable
                        title="Requests"
                        columns={this.state.columns}
                        data={this.state.data}
                    />
                </>
            </Admin>
        )
    }
}

export default ApiRequestParameters;