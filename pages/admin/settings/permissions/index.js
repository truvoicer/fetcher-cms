import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {
    SESSION_STATE_KEY,
} from "../../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {
    setBreadcrumbsPageNameAction
} from "../../../../library/redux/actions/breadcrumbs-actions";
import ApiConfig from "../../../../config/api-config";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import PermissionForm from "../../../../views/components/Forms/Admin/PermissionForm";

export const ManagePermissionsPageName = "manage_permissions";
const ManagePermissions = ({session}) => {
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        setBreadcrumbsPageNameAction(ManagePermissionsPageName);
        setShowTable(true)
    }, [])

    const getTableData = () => {
        return {
            title: "",
            endpoint: `${ApiConfig.endpoints.permission}/list`,
            defaultColumnName: "name",
            defaultColumnLabel: "label",
            query: {
                count: 1000,
                order: "desc",
                sort: "name"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Label',
                selector: 'label',
                sortable: true,
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
                    modalTitle: "Edit Permission",
                    modalFormName: "permission"
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
                    modalTitle: "Delete Permission",
                    endpoint: "permission",
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
                modalForm: PermissionForm,
            },
            permission: {
                modalForm: PermissionForm,
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <SidebarLayout pageName={ManagePermissionsPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    {showTable &&
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                    />
                    }
                </Col>
            </>
        </SidebarLayout>
    )
}

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(ManagePermissions);
