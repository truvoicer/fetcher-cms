import ApiConfig from '../../../config/api-config'
import React, {useEffect} from "react";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import DataList from "../../../views/components/Tables/DataList";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

const Properties = (props) => {
    Properties.PageName = "manage_properties";
    useEffect(() => {
        setBreadcrumbsPageNameAction(Properties.PageName);
    }, []);

    const getTableData = (props) => {
        return {
            title: ApiConfig.endpoints.propertyList,
            endpoint: ApiConfig.endpoints.propertyList,
            query: {
                count: 1000,
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
                maxWidth: "300px",
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
                maxWidth: "300px",
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
                    endpoint: "property",
                    modalFormName: "delete"
                },
                size: "md",
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
        <SidebarLayout pageName={Properties.PageName}>
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
    )
}
export default Properties;