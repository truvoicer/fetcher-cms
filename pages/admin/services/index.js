import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceForm from "../../../views/components/Forms/ServiceForm";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
import ServiceResponseKeys, {ServiceResponseKeysPageName} from "./[service_id]/response-keys";

const ManageServices = (props) => {
    ManageServices.PageName = "manage_services";

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ManageServices.PageName
        }
    }

    const getTableData = () => {
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

    const getTableColumns = () => {
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

    const getTableDropdownControls = () => {
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
            {
                control: "link",
                text: "Response Keys",
                action: "response_keys",
                href: getRouteItem(Routes.items, ServiceResponseKeysPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        services: {
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

    const getModalConfig = () => {
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

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ManageServices.PageName}>
            <>
                <Col sm={12} md={7} lg={7}>
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                    />
                </Col>
            </>
        </Admin>
    )
}
export default ManageServices