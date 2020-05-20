import React from "react";
import ApiConfig from "../../../../config/api-config";
import PropertyForm from "../../../../views/components/Forms/PropertyForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import ApiRequestForm from "../../../../views/components/Forms/ApiRequestForm";


export default class ApiRequests extends React.Component {
    constructor(props) {
        super(props);

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getTableData() {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.apiRequestList,
            query: {
                count: 10,
                order: "asc",
                sort: "api_request_name"
            }
        };
    }

    getTableColumns() {
        return [
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
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "link",
                text: "Modify Parameters",
                action: "update",
                href: "/admin/providers/api-requests/",
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Request",
                    modalFormName: "apiRequest"
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
                    endpoint: "request",
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
                modalForm: ApiRequestForm
            },
            apiRequest: {
                modalForm: ApiRequestForm
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