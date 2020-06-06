import ApiConfig from "../../../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../../../views/layouts/Admin";
import RequestResponseKeysForm from "../../../../../../../views/components/Forms/RequestResponseKeysForm";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/middleware";

const sprintf = require("sprintf-js").sprintf

class ServiceRequestResponseKeys extends React.Component {
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
            service_request_id: "",
            service_request_name: "",
            provider_id: "",
            provider_name: ""
        }
        this.pageName = "requests_response_keys";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
        const {provider_id, service_request_id} = Router.query;
        this.setState({
            showTable: true,
            service_request_id: service_request_id,
            provider_id: provider_id
        })

        fetchData(sprintf(ApiConfig.endpoints.provider, provider_id)).then((response) => {
            this.setState({
                provider_id: response.data.data.id,
                provider_name: response.data.data.provider_name
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.serviceRequest, service_request_id)).then((response) => {
            this.setState({
                service_request_name: response.data.data.service_request_name
            })
        })

    }

    getStaticProps() {
        return {
            props: {}, // will be passed to the page component as props
        }
    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName,
            data: {
                requests_response_keys: {
                    id: this.state.service_request_id,
                    name: this.state.service_request_name
                },
                service_requests: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                }
            }
        }
    }

    getTableData(service_id) {
            return {
                title: "",
                endpoint: sprintf(ApiConfig.endpoints.requestResponseKeyList, this.state.service_request_id),
                defaultColumnName: "key_name",
                defaultColumnLabel: "key_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "key_name",
                    service_request_id: this.state.service_request_id,
                    provider_id: this.state.provider_id
                }
            };
    }

    getTableColumns() {
        return [
            {
                name: 'Key Name',
                selector: 'key_name',
                sortable: true,
            },
            {
                name: 'Key Value',
                selector: 'key_value',
                sortable: true,
            },
            {
                name: 'Show in Response',
                selector: 'show_in_response',
                sortable: true,
            },
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Response Keys",
                    modalFormName: "requestResponseKeys"
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Response Key",
                    endpoint: "service/request/response/key",
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
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            },
            requestResponseKeys: {
                modalForm: RequestResponseKeysForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            },
            delete: {
                modalForm: DeleteForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            }
        };
    }


    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={this.pageName}>
                <>
                    <Col sm={12} md={6} lg={6}>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableColumnControls={this.getTableColumnControls()}
                        modalConfig={this.getModalConfig()}
                    />}
                    </Col>
                </>
            </Admin>
        )
    }
}
export default ServiceRequestResponseKeys;