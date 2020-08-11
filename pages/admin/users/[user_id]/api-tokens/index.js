import React from "react";
import Router from "next/router";
import Admin from "../../../../../views/layouts/Admin";
import ProviderRequestsTable from "../../../../../views/components/Tables/ProviderRequestsTable";
import {GetStaticProps} from 'next';
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/middleware";
import ApiConfig from "../../../../../config/api-config";
import {getRouteItem} from "../../../../../library/session/authenticate";
import {Routes} from "../../../../../config/routes";
import DataList from "../../../../../views/components/Tables/DataList";
import ServiceResponseKeys from "../../../services/[service_id]/response-keys";
import ServiceForm from "../../../../../views/components/Forms/ServiceForm";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import {formatDate} from "../../../../../library/utils";
import ApiTokenForm from "../../../../../views/components/Forms/ApiTokenForm";
import ServiceRequestForm from "../../../../../views/components/Forms/ServiceRequestForm";

const sprintf = require("sprintf-js").sprintf

class ApiTokens extends React.Component {

    static pageName = "api_tokens";
    static async getInitialProps(ctx) {
        return {
            props: {

            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            user_id: "",
            user: "",
        }
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
    }

    componentDidMount() {
        const {user_id} = Router.query;
        this.setState({
            showTable: true,
            user_id: user_id
        })
        fetchData(sprintf(ApiConfig.endpoints.getUser, user_id)).then((response) => {
            this.setState({
                user: response.data.data,
            })
        })
    }

    getBreadcrumbsConfig() {
        return {
            pageName: ApiTokens.pageName,
            data: {
                user: {
                    id: this.state.user_id,
                    name: this.state.user.username
                }
            }
        }
    }

    getTableData() {
        return {
            title: "",
            endpoint: sprintf(ApiConfig.endpoints.getApiTokenList, this.state.user_id),
            defaultColumnName: "token",
            defaultColumnLabel: "token",
            query: {
                count: 10,
                order: "desc",
                sort: "expires_at"
            },
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Token',
                selector: 'token',
                sortable: true,
            },
            {
                name: 'Expires At',
                selector: 'expiresAt',
                sortable: true,
                cell: row => {
                    return formatDate(row.expiresAt, "dd mmmm yyyy H:M:ss")
                }
            },
        ];
    }

    getTableInlineControls() {
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
        ]
    }

    getTableDropdownControls() {
        return [
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

    getModalConfig() {
        return {
            default: {
                modalForm: ApiTokenForm,
                config: {
                    userId: this.state.user_id,
                }
            },
            apiToken: {
                modalForm: ApiTokenForm,
                config: {
                    userId: this.state.user_id,
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ApiTokens.pageName}>
                <>
                    <Col sm={12} md={12} lg={8}>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableDropdownControls={this.getTableDropdownControls()}
                        tableInlineControls={this.getTableInlineControls()}
                        modalConfig={this.getModalConfig()}
                    />
                    }
                    </Col>
                </>
            </Admin>
        )
    }
}

export default ApiTokens;
