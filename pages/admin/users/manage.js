import Admin from '../../../views/layouts/Admin'
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import React from "react";
import UserForm from "../../../views/components/Forms/UserForm";
import Col from "react-bootstrap/Col";

export default class ManageUsers extends React.Component {
    constructor(props) {
        super(props)

        this.pageName = "manage_users";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName
        }
    }

    getTableData() {
        return {
            title: "Users",
            endpoint: ApiConfig.endpoints.getUserList,
            defaultColumnName: "username",
            defaultColumnLabel: "username",
            query: {
                count: 10,
                order: "asc",
                sort: "id"
            }
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Username',
                selector: 'username',
                sortable: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Roles',
                selector: 'roles',
                sortable: true,
            },
            {
                name: 'Date Updated',
                selector: 'date_updated',
                sortable: true,
            },
            {
                name: 'Date Added',
                selector: 'date_added',
                sortable: true,
            }
        ];
    }

    getTableDropdownControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit User",
                    modalFormName: "user"
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
                    modalTitle: "Delete User",
                    endpoint: "admin/user",
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
                modalForm: UserForm
            },
            user: {
                modalForm: UserForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }



    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={this.pageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableDropdownControls={this.getTableDropdownControls()}
                        modalConfig={this.getModalConfig()}
                    />
                    </Col>
                </>
            </Admin>
        )
    }
}