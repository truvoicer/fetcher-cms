import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Admin from "../../../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/middleware";
import {isSet} from "../../../../../../../library/utils";

const sprintf = require("sprintf-js").sprintf
export const ServiceRequestParametersPageName = "requests_parameters";
const ServiceRequestParameters = (props) => {
    const [provider, setProvider] = useState({
        data: {},
        received: false
    });
    const [serviceRequest, setServiceRequest] = useState({
        data: {},
        received: false
    });

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
            pageName: ServiceRequestParametersPageName,
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
            endpoint: ApiConfig.endpoints.serviceRequestParameterList,
            defaultColumnName: "parameter_name",
            defaultColumnLabel: "parameter_value",
            query: {
                count: 10,
                order: "asc",
                sort: "parameter_name",
                service_request_id: serviceRequest.data.id
            }
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Parameter Name',
                selector: 'parameter_name',
                sortable: true,
                editable: true,
                maxWidth: "200px",
                editableConfig: {
                    field: "parameter_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/parameter",
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                        }
                    }
                },
            },
            {
                name: 'Parameter Value',
                selector: 'parameter_value',
                sortable: true,
                editable: true,
                maxWidth: "300px",
                editableConfig: {
                    field: "parameter_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/parameter",
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
                    modalTitle: "Edit Parameter",
                    modalFormName: "requestParams"
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
                    modalTitle: "Delete Parameter",
                    endpoint: "service/request/parameter",
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
                modalForm: ServiceParametersForm,
                config: {
                    service_request_id: serviceRequest.data.id
                }
            },
            requestParams: {
                modalForm: ServiceParametersForm,
                config: {
                    service_request_id: serviceRequest.data.id
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <>
            {serviceRequest.received && provider.received &&
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ServiceRequestParametersPageName}>
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
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ServiceRequestParameters;