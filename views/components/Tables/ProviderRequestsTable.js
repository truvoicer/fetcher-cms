import ApiConfig from "../../../config/api-config";
import React from "react";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceRequestForm from "../../../views/components/Forms/ServiceRequestForm";
import DuplicateForm from "../Forms/DuplicateForm";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";

const sprintf = require("sprintf-js").sprintf

class ProviderRequestsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            provider_id: false
        }
        this.provider_id = ""
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableInlineControls = this.getTableInlineControls.bind(this);
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
                name: 'Request Label',
                selector: 'service_request_label',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "service_request_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request",
                        extraData: {
                            provider_id: this.props.provider_id,
                        }
                    }
                },
            },
            {
                name: 'Request Name',
                selector: 'service_request_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "service_request_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request",
                        extraData: {
                            provider_id: this.props.provider_id,
                        }
                    }
                },
            },
            {
                name: 'Controls',
                controlsColumn: true,
                right: false,
                allowOverflow: true,
                grow: 2,
            },
        ];
    }

    getTableInlineControls() {
        console.log(this.props.baseUrl)
        return [
            {
                control: "button",
                location: "inline",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Request Value",
                    modalFormName: "serviceRequest",
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "link",
                location: "inline",
                text: "Request Test",
                action: "request_test",
                href: this.props.baseUrl + "/%s/request-test/",
                query: {
                    dynamic: {
                        brackets: false,
                    }
                },
                size: "md",
                classes: "btn btn-outline-primary btn-md"
            },
        ];
    }
    getTableDropdownControls() {
        return [
            {
                control: "link",
                location: "dropdown",
                text: "Response Keys",
                action: "response_keys",
                href: this.props.baseUrl + "/%s/response-keys/",
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
                location: "dropdown",
                text: "Request Config",
                action: "request_config",
                href: this.props.baseUrl + "/%s/config/",
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
                location: "dropdown",
                text: "Request Parameters",
                action: "request_parameters",
                href: this.props.baseUrl + "/%s/parameters/",
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
                location: "dropdown",
                text: "Duplicate",
                action: "duplicate",
                modal: {
                    showModal: true,
                    modalTitle: "Duplicate Request",
                    modalFormName: "duplicateRequest",
                    endpoint: "service/request"
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                location: "dropdown",
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
            duplicateRequest: {
                modalForm: DuplicateForm
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
                tableDropdownControls={this.getTableDropdownControls()}
                tableInlineControls={this.getTableInlineControls()}
                modalConfig={this.getModalConfig()}
            />
        )
    }
}

export default ProviderRequestsTable;