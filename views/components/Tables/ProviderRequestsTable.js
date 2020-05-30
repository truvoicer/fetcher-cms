import ApiConfig from "../../../config/api-config";
import React from "react";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceRequestForm from "../../../views/components/Forms/ServiceRequestForm";

const sprintf = require("sprintf-js").sprintf

class ProviderRequestsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            provider_id: false
        }
        this.provider_id = ""
        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
    }

    getTableData() {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestList, this.props.provider_id),
            defaultColumnName: "service_request_name",
            defaultColumnLabel: "service_request_label",
            query: {
                count: 10,
                order: "asc",
                sort: "service_request_name",
                provider_id: this.props.provider_id
            }
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Request Name',
                selector: 'service_request_name',
                sortable: true,
            },
            {
                name: 'Request Label',
                selector: 'service_request_label',
                sortable: true,
            },
        ];
    }

    getTableColumnControls() {
        let basehref = sprintf("/admin/providers/%s", this.props.provider_id);
        return [
            {
                control: "link",
                text: "Request Config",
                action: "request_config",
                href: basehref + "/requests/%s/config/",
                query: {
                    dynamic: {
                        brackets: false,
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "link",
                text: "Request Parameters",
                action: "request_parameters",
                href: basehref + "/requests/%s/parameters/",
                query: {
                    dynamic: {
                        brackets: false,
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Request Value",
                    modalFormName: "serviceRequest",
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
                    endpoint: "service/request",
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
                modalForm: ServiceRequestForm,
                config: {
                    provider_id: this.props.provider_id
                }
            },
            serviceRequest: {
                modalForm: ServiceRequestForm,
                config: {
                    provider_id: this.props.provider_id,
                }
            },
            delete: {
                modalForm: DeleteForm,
                config: {
                    provider_id: this.props.provider_id
                }
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

export default ProviderRequestsTable;