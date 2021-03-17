import ApiConfig from "../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../views/components/Tables/DataList";
import SidebarLayout from "../../../../../views/layouts/SidebarLayout";
import ServiceResponseKeysForm from "../../../../../views/components/Forms/ServiceResponseKeysForm";
import Col from "react-bootstrap/Col";
import {fetchRequest} from "../../../../../library/api/fetcher-api/fetcher-middleware";
import {isObjectEmpty, isSet} from "../../../../../library/utils";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../library/redux/actions/breadcrumbs-actions";

const sprintf = require("sprintf-js").sprintf

export const ServiceResponseKeysPageName = "response_keys";

const ServiceResponseKeys = (props) => {
    const [service, setService] = useState({});
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (!isObjectEmpty(service)) {
            setBreadcrumbsPageNameAction(ServiceResponseKeysPageName)
            setBreadcrumbsDataAction({
                services: {
                    id: service.id,
                    name: service.service_name
                }
            })
        }
    }, [service]);
    useEffect(() => {
        if (isSet(props.service_id)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.service,
                operation: `${props.service_id}`,
                onSuccess: (responseData) => {
                    setService(responseData.data);
                    setShowTable(true);
                }
            })
        }
    }, [props.service_id]);

    const getTableData = () => {
        return {
            title: "",
            endpoint: `${sprintf(ApiConfig.endpoints.serviceResponseKey, service.id)}/list`,
            defaultColumnName: "key_name",
            defaultColumnLabel: "key_value",
            query: {
                count: 1000,
                order: "asc",
                sort: "key_name",
                service_id: service.id
            }
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Response Key Name',
                selector: 'key_name',
                sortable: true,
                editable: true,
                maxWidth: "300px",
                editableConfig: {
                    field: "key_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: `${sprintf(ApiConfig.endpoints.serviceResponseKey, service.id)}`,
                        extraData: {
                            service_id: service.id
                        }
                    }
                },
            },
            {
                name: 'Response Key Value',
                selector: 'key_value',
                sortable: true,
                editable: true,
                maxWidth: "300px",
                editableConfig: {
                    field: "key_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: `${sprintf(ApiConfig.endpoints.serviceResponseKey, service.id)}`,
                        extraData: {
                            service_id: service.id
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
                    modalTitle: "Edit Response Key",
                    modalFormName: "responseKeys"
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
                    endpoint: `${sprintf(ApiConfig.endpoints.serviceResponseKey, service.id)}`,
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
                modalForm: ServiceResponseKeysForm,
                config: {
                    service_id: service.id
                }
            },
            responseKeys: {
                modalForm: ServiceResponseKeysForm,
                config: {
                    service_id: service.id
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <>
            {showTable &&
            <SidebarLayout pageName={ServiceResponseKeysPageName}>
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
            service_id: params.service_id
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}
export default ServiceResponseKeys;