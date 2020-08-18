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
import Row from "react-bootstrap/Row";

const sprintf = require("sprintf-js").sprintf

class ServiceRequestResponseKeys extends React.Component {
    static pageName = "requests_response_keys";
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
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
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
            pageName: ServiceRequestResponseKeys.pageName,
            data: {
                provider: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                },
                service_requests: {
                    id: this.state.service_request_id,
                    name: this.state.service_request_name
                },
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
                grow: 2
            },
            {
                name: 'Key Value',
                selector: 'key_value',
                sortable: true,
                editable: true,
                grow: 1,
                editableConfig: {
                    field: "key_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
            {
                name: 'List Item',
                selector: 'list_item',
                sortable: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "list_item",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
            {
                name: 'Show in Response',
                selector: 'show_in_response',
                sortable: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "show_in_response",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
            {
                name: 'Has Array Value?',
                selector: 'has_array_value',
                sortable: true,
                editable: true,
                grow: 0,
                editableConfig: {
                    field: "has_array_value",
                    fieldType: "switch",
                    fieldConfig: {
                        endpoint: "service/request/response/key",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
        ];
    }
    getTableDropdownControls() {
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
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ServiceRequestResponseKeys.pageName}>
                <>
                    <Row>
                    <Col sm={12} md={9} lg={9}>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableDropdownControls={this.getTableDropdownControls()}
                        modalConfig={this.getModalConfig()}
                    />}
                    </Col>
                    </Row>
                </>
            </Admin>
        )
    }
}
export default ServiceRequestResponseKeys;