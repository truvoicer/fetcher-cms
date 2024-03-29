import SidebarLayout from '../../../../views/layouts/SidebarLayout'
import ApiConfig from "../../../../config/api-config";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import React, {useEffect} from "react";
import Col from "react-bootstrap/Col";
import {getRouteItem} from "../../../../library/session/authenticate";
import {Routes} from "../../../../config/routes";
import {SettingsApiTokensPageName} from "./[user_id]/api-tokens";
import UserEntitiesPermissionsForm from "../../../../views/components/Forms/Admin/UserEntitiesPermissionsForm";
import {setBreadcrumbsPageNameAction} from "../../../../library/redux/actions/breadcrumbs-actions";
import {SettingsUserPermissionsPageName} from "./[user_id]/permissions";
import UserProfileForm from "../../../../views/components/Forms/User/UserProfileForm";
import {formatDate} from "../../../../library/utils";

export const ManageUsersPageName = "manage_users";
const ManageUsers = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(ManageUsersPageName)
    }, []);
    const getTableData = () => {
        return {
            title: "Users",
            endpoint: `${ApiConfig.endpoints.admin}/user/list`,
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
                cell: row => {
                    return formatDate(row.date_updated)
                }
            },
            {
                name: 'Date Added',
                selector: 'date_added',
                sortable: true,
                cell: row => {
                    return formatDate(row.date_added)
                }
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
                control: "link",
                location: "inline",
                text: "Permissions",
                action: "permissions",
                href: getRouteItem(Routes.items, SettingsUserPermissionsPageName).route,
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
                modalForm: UserProfileForm,
                config: {
                    operation: "new_user"
                }
            },
            user: {
                modalForm: UserProfileForm,
                config: {
                    operation: "update_user"
                }
            },
            delete: {
                modalForm: DeleteForm
            },
            mappings: {
                modalForm: UserEntitiesPermissionsForm
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