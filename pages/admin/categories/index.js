import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import CategoryForm from "../../../views/components/Forms/CategoryForm";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";

const Categories = (props) => {
    Categories.PageName = "manage_categories";

    const getBreadcrumbsConfig = () => {
        return {
            pageName: Categories.pageName,
        }
    }
    const getTableData = () => {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.categoryList,
            defaultColumnName: "category_name",
            defaultColumnLabel: "category_label",
            query: {
                count: 10,
                order: "asc",
                sort: "category_name"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Category Label',
                selector: 'category_label',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "category_label",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "category"
                    }
                },
            },
            {
                name: 'Category Name',
                selector: 'category_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "category_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "category"
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
                location: "inline",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Category",
                    modalFormName: "category"
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
                    modalTitle: "Delete Category",
                    endpoint: "category",
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
                modalForm: CategoryForm
            },
            category: {
                modalForm: CategoryForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={Categories.PageName}>
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


export default Categories