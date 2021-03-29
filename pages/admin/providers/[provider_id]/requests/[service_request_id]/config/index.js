import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import SidebarLayout from "../../../../../../../views/layouts/SidebarLayout";
import ServiceConfigForm from "../../../../../../../views/components/Forms/ServiceConfigForm";
import Col from "react-bootstrap/Col";
import {isObjectEmpty, isSet} from "../../../../../../../library/utils";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {fetchProvider, fetchServiceRequest} from "../../../../../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf

export const ServiceRequestConfigPageName = "requests_config";
const ServiceRequestConfig = (props) => {
    const [provider, setProvider] = useState({
        data: {},
        received: false
    });
    const [serviceRequest, setServiceRequest] = useState({
        data: {},
        received: false
    });

    useEffect(() => {
        if (!isObjectEmpty(provider.data) && !isObjectEmpty(serviceRequest.data)) {
            setBreadcrumbsPageNameAction(ServiceRequestConfigPageName)
            setBreadcrumbsDataAction({
                provider: {
                    id: provider.data.id,
                    name: provider.data.provider_name
                },
                service_requests: {
                    id: serviceRequest.data.id,
                    name: serviceRequest.data.service_request_name
                },
            })
        }
    }, [provider, serviceRequest]);
    useEffect(() => {
        if (isSet(props.provider_id) && isSet(props.service_request_id)) {
            fetchProvider({
                providerId: props.provider_id,
                callback: (responseData) => {
                    setProvider({
                        received: true,
                        data: responseData.data
                    })
                }
            })
            fetchServiceRequest({
                providerId: props.provider_id,
                serviceRequestId: props.service_request_id,
                callback: (responseData) => {
                    setServiceRequest({
                        received: true,
                        data: responseData.data
                    })
                }
            })
        }
    }, [props.provider_id, props.service_request_id]);

    const getTableData = () => {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, provider.data.id, serviceRequest.data.id) + "/list",
            defaultColumnName: "item_name",
            defaultColumnLabel: "item_value",
            query: {
                count: 1000,
                order: "asc",
                sort: "item_name",
                service_request_id: serviceRequest.data.id,
                provider_id: provider.data.id
            }
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Item Name',
                selector: 'item_name',
                sortable: true,
                editable: true,
                maxWidth: "200px",
                editableConfig: {
                    field: "item_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, provider.data.id, serviceRequest.data.id),
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'item Value',
                selector: 'item_value',
                sortable: true,
                maxWidth: "300px",
                cell: row => {
                    if (row.value_type === "list") {
                        if (isSet(row.item_array_value) &&
                            Array.isArray(row.item_array_value))
                            return row.item_array_value.map((item, index) => {
                                return sprintf("Item (%d): Name: %s, Value: %s", index, item.name, item.value);
                            })
                    }
                    return row.item_value;
                }
            }
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
                    modalTitle: "Edit Config Item",
                    modalFormName: "requestConfig"
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "button",
                location: "dropdown",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Config Item",
                    endpoint: sprintf(ApiConfig.endpoints.serviceRequestConfig, provider.data.id, serviceRequest.data.id),
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
                modalForm: ServiceConfigForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            requestConfig: {
                modalForm: ServiceConfigForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <>
            <SidebarLayout pageName={ServiceRequestConfigPageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        {serviceRequest.received && provider.received &&
                        <DataList
                            tableData={getTableData()}
                            tableColumns={getTableColumns()}
                            tableDropdownControls={getTableDropdownControls()}
                            modalConfig={getModalConfig()}
                        />
                        }
                    </Col>
                </>
            </SidebarLayout>
        </>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            provider_id: params.provider_id,
            service_request_id: params.service_request_id
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ServiceRequestConfig;