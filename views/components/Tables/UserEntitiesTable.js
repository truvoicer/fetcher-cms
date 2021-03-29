import React, {useEffect, useState} from 'react';
import {isNotEmpty, isSet} from "../../../library/utils";
import {fetchRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import DataList from "./DataList";
import UserEntityPermissionsTable from "./UserEntityPermissionsTable";

const sprintf = require("sprintf-js").sprintf
const UserEntitiesTable = ({user = null, isSession = false}) => {
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isNotEmpty(user)) {
            setShowTable(true)
        }
    }, [user]);


    const getTableData = () => {
        return {
            title: "",
            endpoint: isSession
                ?
                `${ApiConfig.endpoints.user}/permission/entity/list`
                :
                `${ApiConfig.endpoints.permission}/user/${user.id}/entity/list`,
            defaultColumnName: "entity_label",
            defaultColumnLabel: "entity_label",
            query: {
                count: 1000,
                order: "desc",
                sort: "entity_label"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Entity',
                selector: 'entity_label',
                sortable: true,
                maxWidth: "300px",
            },
        ];
    }

    const getTableInlineControls = () => {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Permissions",
                    modalFormName: "permissions"
                },
                size: "md",
                classes: "outline-primary"
            }
        ];
    }

    const getModalConfig = () => {
        return {
            default: {
                modalForm: UserEntityPermissionsTable,
                config: {
                    userId: user.id,
                    size: "lg",
                    isSession: isSession
                }
            },
            permissions: {
                modalForm: UserEntityPermissionsTable,
                config: {
                    userId: user.id,
                    size: "lg",
                    isSession: isSession
                }
            }
        };
    }

    return (
        <>
            {showTable &&
                <DataList
                    tableData={getTableData()}
                    tableColumns={getTableColumns()}
                    tableInlineControls={getTableInlineControls()}
                    modalConfig={getModalConfig()}
                    inlineOnly
                    titleConfig={{
                        type: "text",
                        text: "User Entities Permissions"
                    }}
                    expandedRowData={{
                        title: "Entity Permissions",
                        component: UserEntityPermissionsTable,
                        props: {
                            entity: "entity",
                            config: {
                                userId: user.id,
                                isSession: isSession
                            }
                        }
                    }}
                />
            }
        </>
    )
};

export default UserEntitiesTable;
