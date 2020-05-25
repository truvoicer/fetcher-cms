import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import CategoryForm from "../../../views/components/Forms/CategoryForm";
import Admin from "../../../views/layouts/Admin";

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
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
                name: 'Category Name',
                selector: 'category_name',
                sortable: true,
            },
            {
                name: 'Category Label',
                selector: 'category_label',
                sortable: true,
            },
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Category",
                    modalFormName: "category"
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
                <Admin>
                    <>
                        <DataList
                            tableData={this.getTableData()}
                            tableColumns={this.getTableColumns()}
                            tableColumnControls={this.getTableColumnControls()}
                            modalConfig={this.getModalConfig()}
                        />
                    </>
                </Admin>
        )
    }
}
export default Categories