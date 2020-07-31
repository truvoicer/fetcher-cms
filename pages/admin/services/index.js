import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceForm from "../../../views/components/Forms/ServiceForm";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
import ServiceResponseKeys from "./[service_id]/response-keys";

class ManageServices extends React.Component {
    static pageName = "manage_services";
    constructor(props) {
        super(props);

        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableInlineControls = this.getTableInlineControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getBreadcrumbsConfig() {
        return {
            pageName: ManageServices.pageName
        }
    }

    getTableData() {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.serviceList,
            defaultColumnName: "service_name",
            defaultColumnLabel: "service_label",
            query: {
                count: 10,
                order: "asc",
                sort: "service_name"
            },
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Category',
                selector: 'category.category_label',
                sortable: true,
            },
            {
                name: 'Service Label',
                selector: 'service_label',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "service_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service"
                    }
                },
            },
            {
                name: 'Service Name',
                selector: 'service_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "service_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service"
                    }
                },
            },
        ];
    }

    getTableInlineControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Service",
                    modalFormName: "service"
                },
                size: "md",
                classes: "outline-primary"
            },
        ]
    }

    getTableDropdownControls() {
        return [
            {
                control: "link",
                text: "Response Keys",
                action: "response_keys",
                href: getRouteItem(Routes.items, ServiceResponseKeys.pageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        service: {
                            dynamic: true,
                            column: "id",
                            key: "id"
                        }
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Service",
                    endpoint: "service",
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
                modalForm: ServiceForm
            },
            service: {
                modalForm: ServiceForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }


    render() {
            return (
                <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ManageServices.pageName}>
                    <>
                        <Col sm={12} md={7} lg={7}>
                        <DataList
                            tableData={this.getTableData()}
                            tableColumns={this.getTableColumns()}
                            tableDropdownControls={this.getTableDropdownControls()}
                            tableInlineControls={this.getTableInlineControls()}
                            modalConfig={this.getModalConfig()}
                        />
                        </Col>
                    </>
                </Admin>
        )
    }
}
export default ManageServices