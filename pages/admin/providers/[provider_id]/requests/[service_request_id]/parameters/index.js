import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import SidebarLayout from "../../../../../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/fetcher-api/fetcher-middleware";
import {isObjectEmpty, isSet} from "../../../../../../../library/utils";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {ServiceRequestConfigPageName} from "../config";

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
        if (!isObjectEmpty(provider.data) && !isObjectEmpty(serviceRequest.data)) {
            setBreadcrumbsPageNameAction(ServiceRequestParametersPageName)
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
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id)).then((response) => {
                setProvider({
                    received: true,
                    data: response.data.data
                })
            })
            fetchData(
                sprintf(ApiConfig.endpoints.serviceRequest, props.provider_id, props.service_request_id))
                .then((response) => {
                    setServiceRequest({
                        received: true,
                        data: response.data.data
                    })
                })
        }
    }, [props.provider_id, props.service_request_id]);

    const getTableData = () => {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestParameterList, provider.data.id, serviceRequest.data.id) + "/list",
            defaultColumnName: "parameter_name",
            defaultColumnLabel: "parameter_value",
            query: {
                count: 1000,
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
                        endpoint: sprintf(ApiConfig.endpoints.serviceRequestParameter, provider.data.id, serviceRequest.data.id),
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                            provider_id: provider.data.id,
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
                        endpoint: sprintf(ApiConfig.endpoints.serviceRequestParameter, provider.data.id, serviceRequest.data.id),
                        extraData: {
                            service_request_id: serviceRequest.data.id,
                            provider_id: provider.data.id,
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
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Parameter",
                    endpoint: sprintf(ApiConfig.endpoints.serviceRequestParameter, provider.data.id, serviceRequest.data.id),
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
                modalForm: ServiceParametersForm,
                config: {
                    service_request_id: serviceRequest.data.id,
                    provider_id: provider.data.id,
                }
            },
            requestParams: {
                modalForm: ServiceParametersForm,
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
            {serviceRequest.received && provider.received &&
            <SidebarLayout pageName={ServiceRequestParametersPageName}>
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