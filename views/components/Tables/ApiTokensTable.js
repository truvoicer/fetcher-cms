import React, {useEffect, useState} from 'react';
import {formatDate, isSet} from "../../../library/utils";
import {fetchData} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import ApiTokenForm from "../Forms/ApiTokenForm";
import DeleteForm from "../Forms/DeleteForm";
import DataList from "./DataList";

const sprintf = require("sprintf-js").sprintf
const ApiTokensTable = ({userId}) => {

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
            endpoint: sprintf(ApiConfig.endpoints.getApiTokenList, user.id),
            defaultColumnName: "token",
            defaultColumnLabel: "token",
            query: {
                count: 1000,
                order: "desc",
                sort: "expires_at"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Token',
                selector: 'token',
                sortable: true,
                maxWidth: "300px",
            },
            {
                name: 'Expires At',
                selector: 'expires_at',
                sortable: true,
                cell: row => {
                    return formatDate(row.expires_at, "dd mmmm yyyy H:M:ss")
                }
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
                    modalTitle: "Edit Api Token",
                    modalFormName: "apiToken"
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
                    modalTitle: "Delete Api Token",
                    endpoint: "admin/user/api-token",
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
                modalForm: ApiTokenForm,
                config: {
                    userId: user.id,
                }
            },
            apiToken: {
                modalForm: ApiTokenForm,
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

export default ApiTokensTable;
