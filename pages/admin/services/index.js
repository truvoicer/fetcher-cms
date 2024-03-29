import React, {useEffect} from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceForm from "../../../views/components/Forms/ServiceForm";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
import {ServiceResponseKeysPageName} from "./[service_id]/response-keys";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

const ManageServices = (props) => {
    ManageServices.PageName = "manage_services";
    useEffect(() => {
        setBreadcrumbsPageNameAction(ManageServices.PageName)
    }, []);
    const getTableData = () => {
        return {
            title: "",
            endpoint: `${ApiConfig.endpoints.service}/list`,
            defaultColumnName: "service_name",
            defaultColumnLabel: "service_label",
            query: {
                count: 1000,
                order: "asc",
                sort: "service_name"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Service Label',
                selector: 'service_label',
                sortable: true,
                editable: true,
                maxWidth: "300px",
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
                maxWidth: "300px",
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
                size: "md",
                classes: "btn btn-outline-primary btn-md"
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
                size: "md",
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
        <SidebarLayout pageName={ManageServices.PageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                    />
                </Col>
            </>
        </SidebarLayout>
    )
}
export default ManageServices