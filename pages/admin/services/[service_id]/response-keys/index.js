import ApiConfig from "../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../views/components/Tables/DataList";
import Admin from "../../../../../views/layouts/Admin";
import ServiceResponseKeysForm from "../../../../../views/components/Forms/ServiceResponseKeysForm";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/middleware";
import {isSet} from "../../../../../library/utils";

const sprintf = require("sprintf-js").sprintf

export const ServiceResponseKeysPageName = "response_keys";

const ServiceResponseKeys = (props) => {
    const [service, setService] = useState({});
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isSet(props.service_id)) {
            fetchData(sprintf(ApiConfig.endpoints.service, props.service_id)).then((response) => {
                setService(response.data.data);
                setShowTable(true);
            })
        }
    }, [props.service_id]);


    const getBreadcrumbsConfig = () => {
        return {
            pageName: ServiceResponseKeysPageName,
            data: {
                services: {
                    id: service.id,
                    name: service.service_name
                }
            }
        }
    }

    const getTableData = () => {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.serviceResponseKeyList,
            defaultColumnName: "key_name",
            defaultColumnLabel: "key_value",
            query: {
                count: 10,
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
                        endpoint: "service/response/key",
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
                        endpoint: "service/response/key",
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
                    endpoint: "service/response/key",
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
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ServiceResponseKeysPageName}>
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