import React, {useEffect, useState} from "react";
import Admin from "../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/middleware";
import ApiConfig from "../../../../../config/api-config";
import DataList from "../../../../../views/components/Tables/DataList";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import {formatDate, isSet} from "../../../../../library/utils";
import ApiTokenForm from "../../../../../views/components/Forms/ApiTokenForm";

const sprintf = require("sprintf-js").sprintf

export const ApiTokensPageName = "api_tokens";
const ApiTokens = (props) => {

    const [user, setUser] = useState({});
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isSet(props.user_id)) {
            fetchData(sprintf(ApiConfig.endpoints.getUser, props.user_id)).then((response) => {
                setUser(response.data.data);
                setShowTable(true);
            });
        }
    }, [props.user_id]);

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ApiTokensPageName,
            data: {
                user: {
                    id: user.id,
                    name: user.username
                }
            }
        }
    }

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
                size: "sm",
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
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ApiTokensPageName}>
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
            </Admin>
            }
        </>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            user_id: params.user_id,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ApiTokens;
