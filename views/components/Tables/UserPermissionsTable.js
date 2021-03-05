import React, {useEffect, useState} from 'react';
import {formatDate, isSet} from "../../../library/utils";
import {fetchData} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import ApiTokenForm from "../Forms/ApiTokenForm";
import DeleteForm from "../Forms/DeleteForm";
import DataList from "./DataList";
import UserMappings from "../Forms/User/UserMappings";

const sprintf = require("sprintf-js").sprintf
const UserPermissionsTable = ({userId}) => {

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
            endpoint: `/permission/user/${user.id}/entities`,
            defaultColumnName: "entity",
            defaultColumnLabel: "entity",
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
                name: 'Entity',
                selector: 'entity',
                sortable: true,
                maxWidth: "300px",
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
                    modalTitle: "Edit Permissions",
                    modalFormName: "mappings"
                },
                size: "md",
                classes: "outline-primary"
            }
        ];
    }

    const getModalConfig = () => {
        return {
            default: {
                modalForm: UserMappings,
                config: {
                    userId: user.id,
                }
            },
            mappings: {
                modalForm: UserMappings,
                config: {
                    userId: user.id,
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <>
            {showTable &&
                <DataList
                    tableData={getTableData()}
                    tableColumns={getTableColumns()}
                    tableDropdownControls={getTableDropdownControls()}
                    modalConfig={getModalConfig()}
                />
            }
        </>
    )
};

export default UserPermissionsTable;
