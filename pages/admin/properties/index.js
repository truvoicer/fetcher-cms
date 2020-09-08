import ApiConfig from '../../../config/api-config'
import React from "react";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import DataList from "../../../views/components/Tables/DataList";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";

const Properties = (props) => {
    Properties.PageName = "manage_properties";

    const getBreadcrumbsConfig = (props) => {
        return {
            pageName: Properties.PageName
        }
    }

    const getTableData = (props) => {
        return {
            title: ApiConfig.endpoints.propertyList,
            endpoint: ApiConfig.endpoints.propertyList,
            query: {
                count: 10,
                order: "asc",
                sort: "property_name"
            }
        };
    }
    const getTableColumns = (props) => {
        return [
            {
                name: 'Property Name',
                selector: 'property_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "property_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "property"
                    }
                },
            },
            {
                name: 'Property label',
                selector: 'property_label',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "property_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "property"
                    }
                },
            }
        ];
    }

    const getTableDropdownControls = (props) => {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Property",
                    modalFormName: "property"
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
                    modalTitle: "Delete Property",
                    endpoint: "property",
                    modalFormName: "delete"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }
    const getModalConfig = (props) => {
        return {
            default: {
                modalForm: PropertyForm
            },
            property: {
                modalForm: PropertyForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={Properties.PageName}>
            <>
                <Col sm={12} md={6} lg={6}>
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                    />
                </Col>
            </>
        </Admin>
    )
}
export default Properties;