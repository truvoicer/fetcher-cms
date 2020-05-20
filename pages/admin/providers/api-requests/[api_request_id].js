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
import ApiRequestForm from "../../../../views/components/Forms/ApiRequestForm";
import DataList from "../../../../views/components/Tables/DataList";

class ApiRequestParameters extends React.Component {

    constructor(props) {
        super(props);

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getTableData() {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.apiProviderRequestParameterList,
            query: {
                count: 10,
                order: "asc",
                sort: "parameter_name",
                provider_id: 11,
                api_request_id: 3
            }
        };
    }

    getTableColumns() {
        return [
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
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Parameter",
                    modalFormName: "requestParams"
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Request",
                    endpoint: "request/parameter",
                    modalFormName: "delete"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }

    getModalConfig() {
        return {
            default: {
                modalForm: RequestParamsForm
            },
            requestParams: {
                modalForm: RequestParamsForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }


    render() {
        return (
            <DataList
                tableData={this.getTableData()}
                tableColumns={this.getTableColumns()}
                tableColumnControls={this.getTableColumnControls()}
                modalConfig={this.getModalConfig()}
            />
        )
    }
}

export default ApiRequestParameters;