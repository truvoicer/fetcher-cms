import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import SidebarLayout from "../../../../../../../views/layouts/SidebarLayout";
import RequestResponseKeysForm from "../../../../../../../views/components/Forms/RequestResponseKeysForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {isObjectEmpty, isSet} from "../../../../../../../library/utils";
import Card from "react-bootstrap/Card";
import MergeResponseKeysForm from "../../../../../../../views/components/Forms/MergeResponseKeysForm";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {fetchProvider, fetchServiceRequest} from "../../../../../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf

export const ServiceRequestResponseKeysPageName = "requests_response_keys";
const ServiceRequestResponseKeys = (props) => {

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
            setBreadcrumbsPageNameAction(ServiceRequestResponseKeysPageName)
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
            endpoint: `${sprintf(ApiConfig.endpoints.requestResponseKey, provider.data.id, serviceRequest.data.id)}/list`,
            defaultColumnName: "key_name",
            defaultColumnLabel: "key_value",
            query: {
                count: 1000,
                order: "asc",
                sort: "key_name",
                service_request_id: serviceRequest.data.id,
                provider_id: provider.data.id
            }
        };
    }

    const getUpdateEndpoint = (providerId, serviceRequestId) => {
        return sprintf(
            ApiConfig.endpoints.requestResponseKey, providerId, serviceRequestId
        );
    }
    const getTableColumns = () => {
        const updateEndpoint = getUpdateEndpoint(provider.data.id, serviceRequest.data.id);
        return [
            {
                name: 'Key Name',
                selector: 'service_response_key.key_name',
                sortable: true,
                grow: 2
            },
            {
                name: 'Key Value',
                selector: 'response_key_value',
                sortable: true,
                editable: true,
                grow: 1,
                editableConfig: {
                    field: "response_key_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'List Item',
                selector: 'list_item',
                sortable: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "list_item",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'Show in Response',
                selector: 'show_in_response',
                sortable: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "show_in_response",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'Has Array Value?',
                selector: 'has_array_value',
                sortable: true,
                editable: true,
                grow: 0,
                hide: "lg",
                editableConfig: {
                    field: "has_array_value",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'Is Service Request?',
                selector: 'is_service_request',
                sortable: true,
                editable: true,
                grow: 0,
                hide: "lg",
                editableConfig: {
                    field: "is_service_request",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
        ];
    }

    const getTableSettingsDropdown = () => {
        return [
            {
                control: "button",
                text: "Merge Response Keys",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Merge Response Keys",
                    modalFormName: "mergeResponseKeys"
                },
                size: "md",
                classes: "outline-primary"
            },
        ]
    }

    const getTableDropdownControls = () => {
        const updateEndpoint = getUpdateEndpoint(provider.data.id, serviceRequest.data.id);
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Response Keys",
                    modalFormName: "requestResponseKeys"
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Response Key",
                    endpoint: row => `${updateEndpoint}/${row.service_response_key.id}`,
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
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            requestResponseKeys: {
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            mergeResponseKeys: {
                modalForm: MergeResponseKeysForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            delete: {
                modalForm: DeleteForm,
                config: {
                    service_request_id: serviceRequest.data.id
                }
            }
        };
    }

    return (
        <>
            {serviceRequest.received && provider.received &&
            <SidebarLayout pageName={ServiceRequestResponseKeysPageName}>
                <>
                    <Row>
                        <Col sm={12} md={9} lg={9}>
                            <DataList
                                tableSettingsDropdown={getTableSettingsDropdown()}
                                tableData={getTableData()}
                                tableColumns={getTableColumns()}
                                tableDropdownControls={getTableDropdownControls()}
                                modalConfig={getModalConfig()}
                            />
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            <Card>
                                <Card.Header as="h5">Information</Card.Header>
                                <Card.Body>
                                    <Card.Title>ITEMS ARRAY Key</Card.Title>
                                    <Card.Text>
                                        A value must be entered for (ITEMS_ARRAY) key.
                                        If the response data contains no key for the items list data, you can use
                                        either:<br/>
                                        (root_items) = Data item/list is directly in the root of the response<br/>
                                        or<br/>
                                        (root_array) = Data item/list is in array in the root of the response.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            </SidebarLayout>
            }
        </>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            provider_id: params.provider_id,
            service_request_id: params.service_request_id
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ServiceRequestResponseKeys;