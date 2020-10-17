import ApiConfig from "../../../config/api-config";
import React from "react";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceRequestForm from "../../../views/components/Forms/ServiceRequestForm";
import DuplicateForm from "../Forms/DuplicateForm";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
import ServiceRequestTest
    , {ServiceRequestTestPageName} from "../../../pages/admin/providers/[provider_id]/requests/[service_request_id]/request-test";
import ServiceRequestParameters
    , {ServiceRequestParametersPageName} from "../../../pages/admin/providers/[provider_id]/requests/[service_request_id]/parameters";
import ServiceRequestResponseKeys
    , {ServiceRequestResponseKeysPageName} from "../../../pages/admin/providers/[provider_id]/requests/[service_request_id]/response-keys";
import ServiceRequestConfig, {ServiceRequestConfigPageName} from "../../../pages/admin/providers/[provider_id]/requests/[service_request_id]/config";
import ProviderRequests from "../../../pages/admin/providers/[provider_id]/requests";
import ServiceRequestsExpandableTable from "./Expandable/Tables/ServiceRequestsExpandableTable";
import ApiClient from "../ApiTools/ApiClient";

const sprintf = require("sprintf-js").sprintf

const ProviderRequestsTable = (props) => {
    const getTableData = () => {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestList, props.provider_id),
            defaultColumnName: "service_request_name",
            defaultColumnLabel: "service_request_label",
            query: {
                count: 1000,
                order: "asc",
                sort: "service_request_name",
                provider_id: props.provider_id
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
                        endpoint: "service/request",
                        extraData: {
                            provider_id: props.provider_id,
                        },
                        select: {
                            endpoint: ApiConfig.endpoints.categoryList,
                            valueKey: "id",
                            labelKey: "category_label"
                        }
                    }
                },
            },
            {
                name: 'Request Label',
                selector: 'service_request_label',
                sortable: true,
                editable: true,
                maxWidth: "200px",
                editableConfig: {
                    field: "service_request_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request",
                        extraData: {
                            provider_id: props.provider_id,
                        }
                    }
                },
            },
            {
                name: 'Request Name',
                selector: 'service_request_name',
                sortable: true,
                editable: true,
                maxWidth: "200px",
                editableConfig: {
                    field: "service_request_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request",
                        extraData: {
                            provider_id: props.provider_id,
                        }
                    }
                },
            },
            {
                name: 'Controls',
                controlsColumn: true,
                allowOverflow: true,
                maxWidth: "200px"
            },
        ];
    }

    const getTableDropdownControls = () => {
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
                href: getRouteItem(Routes.items, ServiceRequestTestPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        provider: {
                            dynamic: false,
                            id: props.provider_id
                        },
                        service_requests: {
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
                control: "link",
                location: "dropdown",
                text: "Response Keys",
                action: "response_keys",
                href: getRouteItem(Routes.items, ServiceRequestResponseKeysPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        provider: {
                            dynamic: false,
                            id: props.provider_id
                        },
                        service_requests: {
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
                control: "link",
                location: "dropdown",
                text: "Request Config",
                action: "request_config",
                href: getRouteItem(Routes.items, ServiceRequestConfigPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        provider: {
                            dynamic: false,
                            id: props.provider_id
                        },
                        service_requests: {
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
                control: "link",
                location: "dropdown",
                text: "Request Parameters",
                action: "request_parameters",
                href: getRouteItem(Routes.items, ServiceRequestParametersPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        provider: {
                            dynamic: false,
                            id: props.provider_id
                        },
                        service_requests: {
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

    const getModalConfig = () => {
        return {
            default: {
                modalForm: ServiceRequestForm,
                config: {
                    provider_id: props.provider_id
                }
            },
            serviceRequest: {
                modalForm: ServiceRequestForm,
                config: {
                    provider_id: props.provider_id,
                }
            },
            duplicateRequest: {
                modalForm: DuplicateForm
            },
            delete: {
                modalForm: DeleteForm,
                config: {
                    provider_id: props.provider_id
                }
            }
        };
    }

    return (
        <DataList
            tableData={getTableData()}
            tableColumns={getTableColumns()}
            tableDropdownControls={getTableDropdownControls()}
            modalConfig={getModalConfig()}
            expandedRowData={{
                title: "Api Requests Client",
                component: ApiClient,
                props: {
                    provider_id: props.provider_id,
                    service_request_id: "id"
                }
            }}
        />
    )
}

export default ProviderRequestsTable;