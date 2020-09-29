import ApiConfig from "../../../config/api-config";
import React from "react";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ProviderPropertiesForm from "../../../views/components/Forms/ProviderPropertiesForm";

const sprintf = require("sprintf-js").sprintf

const ProviderPropertiesTable = (props) => {

    const getTableData = () => {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.providerPropertyList, props.provider_id),
            defaultColumnName: "property_value",
            defaultColumnLabel: "property_value",
            query: {
                count: 1000,
                order: "asc",
                sort: "property_name",
                service_id: props.provider_id
            }
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Property Name',
                selector: 'property_name',
                sortable: true,
                maxWidth: "300px"
            },
            {
                name: 'Property Value',
                selector: 'property_value',
                sortable: true,
                editable: true,
                maxWidth: "300px",
                editableConfig: {
                    field: "property_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "provider/property",
                        extraData: {
                            provider_id: props.provider_id
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
                    modalTitle: "Edit Property Value",
                    modalFormName: "providerProperty",
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
                    modalTitle: "Delete Property",
                    endpoint: "provider/property",
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
                modalForm: ProviderPropertiesForm,
                config: {
                    provider_id: props.provider_id
                }
            },
            providerProperty: {
                modalForm: ProviderPropertiesForm,
                config: {
                    provider_id: props.provider_id
                }
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
            />
        )
}

export default ProviderPropertiesTable;