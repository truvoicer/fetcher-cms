import React, {useEffect} from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import CategoryForm from "../../../views/components/Forms/CategoryForm";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

const Categories = (props) => {
    Categories.PageName = "manage_categories";

    useEffect(() => {
        setBreadcrumbsPageNameAction(Categories.PageName)
    }, []);
    const getTableData = () => {
        return {
            title: "",
            endpoint: `${ApiConfig.endpoints.category}/list`,
            defaultColumnName: "category_name",
            defaultColumnLabel: "category_label",
            query: {
                count: 1000,
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
                size: "md",
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
        <SidebarLayout pageName={Categories.PageName}>
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
        </SidebarLayout>
    )
}


export default Categories