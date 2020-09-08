import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Admin from "../../../../../../../views/layouts/Admin";
import RequestResponseKeysForm from "../../../../../../../views/components/Forms/RequestResponseKeysForm";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/middleware";
import Row from "react-bootstrap/Row";
import {isSet} from "../../../../../../../library/utils";

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
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isSet(props.provider_id) && isSet(props.service_request_id)) {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id)).then((response) => {
                setProvider({
                    received: true,
                    data: response.data.data
                })
            })
            fetchData(sprintf(ApiConfig.endpoints.serviceRequest, props.service_request_id)).then((response) => {
                setServiceRequest({
                    received: true,
                    data: response.data.data
                })
            })
        }
    }, [props.provider_id, props.service_request_id]);


    const getBreadcrumbsConfig = () => {
        return {
            pageName: ServiceRequestResponseKeysPageName,
            data: {
                provider: {
                    id: provider.data.id,
                    name: provider.data.provider_name
                },
                service_requests: {
                    id: serviceRequest.data.id,
                    name: serviceRequest.data.service_request_name
                },
            }
        }
    }

    const getTableData = () => {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.requestResponseKeyList, serviceRequest.data.id),
            defaultColumnName: "key_name",
            defaultColumnLabel: "key_value",
            query: {
                count: 10,
                order: "asc",
                sort: "key_name",
                service_request_id: serviceRequest.data.id,
                provider_id: provider.data.id
            }
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Key Name',
                selector: 'key_name',
                sortable: true,
                grow: 2
            },
            {
                name: 'Key Value',
                selector: 'key_value',
                sortable: true,
                editable: true,
                grow: 1,
                editableConfig: {
                    field: "key_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
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
                        endpoint: "service/request/response/key",
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
                        endpoint: "service/request/response/key",
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
                editableConfig: {
                    field: "has_array_value",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
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
                    modalTitle: "Edit Response Keys",
                    modalFormName: "requestResponseKeys"
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
                    modalTitle: "Delete Response Key",
                    endpoint: "service/request/response/key",
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
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: serviceRequest.data.id
                }
            },
            requestResponseKeys: {
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: serviceRequest.data.id
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
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ServiceRequestResponseKeysPageName}>
                <>
                    <Row>
                        <Col sm={12} md={9} lg={9}>
                            <DataList
                                tableData={getTableData()}
                                tableColumns={getTableColumns()}
                                tableDropdownControls={getTableDropdownControls()}
                                modalConfig={getModalConfig()}
                            />
                        </Col>
                    </Row>
                </>
            </Admin>
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