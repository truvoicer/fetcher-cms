import React, {useEffect, useState} from 'react';
import {formatDate, isSet} from "../../../library/utils";
import {fetchData} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import DataList from "./DataList";
import UserEntityPermissionsTable from "./UserEntityPermissionsTable";

const sprintf = require("sprintf-js").sprintf
const UserEntitiesTable = ({userId}) => {
    const [user, setUser] = useState({});
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isSet(userId)) {
            fetchData(sprintf(ApiConfig.endpoints.getUser, userId)).then((response) => {
                setUser(response.data.data);
                setShowTable(true);
            });
        }
    }, [userId]);


    const getTableData = () => {
        return {
            title: "",
            endpoint: `/permission/user/${user.id}/entity/list`,
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
                    size: "lg"
                }
            },
            permissions: {
                modalForm: UserEntityPermissionsTable,
                config: {
                    userId: user.id,
                    size: "lg"
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
                        title: "Service Requests",
                        component: UserEntityPermissionsTable,
                        props: {
                            entity: "entity",
                            config: {
                                userId: user.id
                            }
                        }
                    }}
                />
            }
        </>
    )
};

export default UserEntitiesTable;
