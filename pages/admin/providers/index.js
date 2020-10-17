import Admin from '../../../views/layouts/Admin'
import ApiConfig from '../../../config/api-config'
import React from "react";
import ProviderForm from "../../../views/components/Forms/ProviderForm";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import Col from "react-bootstrap/Col";
import DataList from "../../../views/components/Tables/DataList";
import ServiceRequestsExpandableTable
    from "../../../views/components/Tables/Expandable/Tables/ServiceRequestsExpandableTable";

const ManageProviders = (props) => {
    ManageProviders.PageName = "manage_providers";

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ManageProviders.PageName,
        }
    }
    const getTableData = () => {
        return {
            endpoint: ApiConfig.endpoints.providerList,
            query: {
                count: 1000,
                order: "asc",
                sort: "provider_name"
            }
        };
    }
    const getTableColumns = () => {
        return [
            {
                name: 'Category/s',
                sortable: true,
                right: false,
                allowOverflow: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "category",
                    fieldType: "select",
                    fieldConfig: {
                        multiple: true,
                        endpoint: "provider",
                        select: {
                            endpoint: ApiConfig.endpoints.categoryList,
                            valueKey: "id",
                            labelKey: "category_label"
                        }
                    }
                },
            },
            {
                name: 'Provider Label',
                selector: 'provider_label',
                sortable: true,
                right: false,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "provider_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "provider"
                    }
                },
            },
            {
                name: 'Api Base Url',
                selector: 'provider_api_base_url',
                sortable: true,
                right: false,
                editable: true,
                grow: 1,
                hide: "sm",
                wrap: true,
                editableConfig: {
                    field: "provider_api_base_url",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "provider"
                    }
                },
            },
            {
                name: 'Provider User Id',
                selector: 'provider_user_id',
                sortable: true,
                right: false,
                hide: "md",
                editable: true,
                editableConfig: {
                    field: "provider_user_id",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "provider"
                    }
                },
            },
            {
                name: 'Access key',
                selector: 'provider_access_key',
                sortable: true,
                right: false,
                hide: "md",
                editable: true,
                editableConfig: {
                    field: "provider_access_key",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "provider"
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
                    modalTitle: "Edit Provider",
                    modalFormName: "provider"
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "link",
                text: "Requests",
                action: "requests",
                href: "/admin/providers/%s/requests/",
                query: {
                    dynamic: {
                        brackets: false
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "link",
                text: "Modify Properties",
                action: "properties",
                href: "/admin/providers/%s/properties/",
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
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Provider",
                    modalFormName: "delete",
                    endpoint: "provider"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }
    const getModalConfig = () => {
        return {
            default: {
                modalForm: ProviderForm
            },
            provider: {
                modalForm: ProviderForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ManageProviders.PageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                        expandedRowData={{
                            title: "Service Requests",
                            component: ServiceRequestsExpandableTable,
                            props: {
                                provider_id: "id"
                            }
                        }}
                    />
                </Col>
            </>
        </Admin>
    )
}
export default ManageProviders;