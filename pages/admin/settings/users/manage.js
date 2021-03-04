import SidebarLayout from '../../../../views/layouts/SidebarLayout'
import ApiConfig from "../../../../config/api-config";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import React, {useEffect} from "react";
import UserForm from "../../../../views/components/Forms/UserForm";
import Col from "react-bootstrap/Col";
import {getRouteItem} from "../../../../library/session/authenticate";
import {Routes} from "../../../../config/routes";
import {SettingsApiTokensPageName} from "./[user_id]/api-tokens";
import UserMappings from "../../../../views/components/Forms/User/UserMappings";
import {setBreadcrumbsPageNameAction} from "../../../../library/redux/actions/breadcrumbs-actions";
import {UserProfilePageName} from "../../profile/manage";

export const ManageUsersPageName = "manage_users";
const ManageUsers = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(ManageUsersPageName)
    }, []);
    const getTableData = () => {
        return {
            title: "Users",
            endpoint: ApiConfig.endpoints.getUserList,
            defaultColumnName: "username",
            defaultColumnLabel: "username",
            query: {
                count: 1000,
                order: "asc",
                sort: "id"
            }
        };
    }

    const getTableColumns = () => {
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

    const getTableDropdownControls = () => {
        return [
            {
                control: "link",
                location: "inline",
                text: "Access Tokens",
                action: "access_tokens",
                href: getRouteItem(Routes.items, SettingsApiTokensPageName).route,
                hrefConfig: {
                    replace: true,
                    data: {
                        user: {
                            dynamic: true,
                            column: "id",
                            key: "id"
                        }
                    }
                },
                size: "md",
                classes: "btn btn-outline-primary btn-md"
            },
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit User",
                    modalFormName: "user"
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Mappings",
                action: "mappings",
                modal: {
                    showModal: true,
                    modalTitle: "Update User Mappings",
                    modalFormName: "mappings"
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
                    modalTitle: "Delete User",
                    endpoint: "admin/user",
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
                modalForm: UserForm
            },
            user: {
                modalForm: UserForm
            },
            delete: {
                modalForm: DeleteForm
            },
            mappings: {
                modalForm: UserMappings
            }
        };
    }

    return (
        <SidebarLayout pageName={ManageUsersPageName}>
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
export default ManageUsers;