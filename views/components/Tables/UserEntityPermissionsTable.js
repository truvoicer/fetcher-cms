import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../library/utils";
import UserEntitiesPermissionsForm from "../Forms/Admin/UserEntitiesPermissionsForm";
import DataList from "./DataList";
import DeleteEntityPermissionsForm from "../Forms/Admin/DeleteEntityPermissionsForm";
import ApiConfig from "../../../config/api-config";

const UserEntityPermissionsTable = ({data, config, isSession}) => {
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (!isNotEmpty(data?.data?.entity) ) {
            console.error("Error retrieving entity")
            return;
        }
        if (!isNotEmpty(data?.data?.entity_label_data_key)) {
            console.error("Error retrieving entity label")
            return;
        }
        if (!isNotEmpty(config?.userId)) {
            console.error("Error retrieving user Id")
            return;
        }
        setShowTable(true)
    }, [data, config]);


    const getTableData = () => {
        return {
            title: "",
            endpoint: config.isSession
                ?
                `${ApiConfig.endpoints.user}/permission/entity/${data.data.entity}/list`
                :
                `${ApiConfig.endpoints.permission}/user/${config.userId}/entity/${data.data.entity}/list`,
            defaultColumnName: "entity",
            defaultColumnLabel: "entity",
            hideControlsColumn: config.isSession,
            query: {
                count: 1000,
                order: "desc",
                sort: "entity"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Provider',
                selector: `${data.data.entity}.${data.data.entity_label_data_key}`,
                sortable: true,
                maxWidth: "300px",
            },
            {
                name: 'Permissions',
                selector: 'permissions',
                sortable: true,
                maxWidth: "300px",
                cell: (row) => {
                    return (
                        <>
                            {Array.isArray(row?.permission) && row.permission.length > 0
                            ?
                                <ul className={"permission-list-column"}>
                                    {row.permission.map((permission, index) => (
                                        <li key={index}>
                                            {permission.label}
                                        </li>
                                    ))}
                                </ul>
                                :
                                <span>No Permissions</span>
                            }
                        </>

                    )
                }
            },
        ];
    }

    const getTableInlineControls = () => {
        if (config.isSession) {
            return [];
        }
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Entity Permissions",
                    modalFormName: "updatePermissions"
                },
                size: "md",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Entity",
                    modalFormName: "delete"
                },
                size: "md",
                classes: "danger"
            },
        ];
    }

    const getModalConfig = () => {
        return {
            default: {
                modalForm: UserEntitiesPermissionsForm,
                config: {
                    userId: config.userId,
                    entityData: data.data,
                    operation: "new"
                }
            },
            updatePermissions: {
                modalForm: UserEntitiesPermissionsForm,
                config: {
                    userId: config.userId,
                    entityData: data.data,
                    operation: "update"
                }
            },
            delete: {
                modalForm: DeleteEntityPermissionsForm,
                config: {
                    userId: config.userId,
                    entityData: data.data,
                }
            }
        };
    }
    const getExtraProps = () => {
        if (config.isSession) {
            return {
                titleConfig: {
                    type: "text",
                    text: "Permissions"
                },
                expandableRows: false
            }
        }
    }
    return (
        <>
            {showTable &&
            <DataList
                {...getExtraProps()}
                tableData={getTableData()}
                tableColumns={getTableColumns()}
                tableInlineControls={getTableInlineControls()}
                modalConfig={getModalConfig()}
                inlineOnly
            />
            }
        </>
    )
}
export default UserEntityPermissionsTable;