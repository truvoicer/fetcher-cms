import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import CategoryForm from "../../../views/components/Forms/CategoryForm";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";

class Categories extends React.Component {
    static pageName = "manage_categories";
    constructor(props) {
        super(props);

        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableInlineControls = this.getTableInlineControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getBreadcrumbsConfig() {
        return {
            pageName: Categories.pageName,
        }
    }

    getTableData() {
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

    getTableColumns() {
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

    getTableInlineControls() {
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
            }
        ]
    }

    getTableDropdownControls() {
        return [
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

    getModalConfig() {
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


    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={Categories.pageName}>
                <>
                    <Col sm={12} md={6} lg={6}>
                        <DataList
                            tableData={this.getTableData()}
                            tableColumns={this.getTableColumns()}
                            tableDropdownControls={this.getTableDropdownControls()}
                            tableInlineControls={this.getTableInlineControls()}
                            modalConfig={this.getModalConfig()}
                        />
                    </Col>
                </>
            </Admin>
        )
    }
}

export default Categories