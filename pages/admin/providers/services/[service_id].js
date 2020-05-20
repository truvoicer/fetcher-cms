import Router from "next/router";
import {fetchData, responseHandler} from "../../../../library/api/middleware";
import ApiConfig from "../../../../config/api-config";
import React from "react";
import Admin from "../../../../views/layouts/Admin";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import ServiceParametersForm from "../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import Modal from "react-bootstrap/Modal";
import ServiceForm from "../../../../views/components/Forms/ServiceForm";
import DataList from "../../../../views/components/Tables/DataList";

class ServiceParameters extends React.Component {

    constructor(props) {
        super(props);

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getTableData() {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.providerServiceParameterList,
            query: {
                count: 10,
                order: "asc",
                sort: "parameter_name",
                provider_id: 11,
                service_id: 1
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
                    modalFormName: "parameter"
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
                    modalTitle: "Delete Parameter",
                    endpoint: "parameter",
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
                modalForm: ServiceParametersForm
            },
            requestParams: {
                modalForm: ServiceParametersForm
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

export default ServiceParameters;