import ApiConfig from "../../../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../../../views/layouts/Admin";
import ServiceConfigForm from "../../../../../../../views/components/Forms/ServiceConfigForm";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/middleware";
import {isSet} from "../../../../../../../library/utils";

const sprintf = require("sprintf-js").sprintf

class ServiceRequestConfig extends React.Component {
    static pageName = "requests_config";
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
            provider_name: "",
        }
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableInlineControls = this.getTableInlineControls.bind(this);
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
            pageName: ServiceRequestConfig.pageName,
            data: {
                providers: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                },
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
                endpoint: ApiConfig.endpoints.serviceRequestConfigList,
                defaultColumnName: "item_name",
                defaultColumnLabel: "item_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "item_name",
                    service_request_id: this.state.service_request_id,
                    provider_id: this.state.provider_id
                }
            };
    }

    getTableColumns() {
        return [
            {
                name: 'Item Name',
                selector: 'item_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "item_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/config",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
            {
                name: 'item Value',
                selector: 'item_value',
                sortable: true,
                cell: row => {
                    if (row.value_type === "list") {
                        if (isSet(row.item_array_value) &&
                            Array.isArray(row.item_array_value))
                        return row.item_array_value.map((item, index) => {
                            return sprintf("Item (%d): Name: %s, Value: %s", index, item.name, item.value);
                        })
                    }
                    return row.item_value;
                }
            }
        ];
    }

    getTableInlineControls() {
        return [
        ]
    }

    getTableDropdownControls() {
        return [
            {
                control: "button",
                location: "inline",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Config Item",
                    modalFormName: "requestConfig"
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                location: "dropdown",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Config Item",
                    endpoint: "service/request/config",
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
                modalForm: ServiceConfigForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            },
            requestConfig: {
                modalForm: ServiceConfigForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }


    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ServiceRequestConfig.pageName}>
                <>
                    <Col sm={12} md={6} lg={6}>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableDropdownControls={this.getTableDropdownControls()}
                        tableInlineControls={this.getTableInlineControls()}
                        modalConfig={this.getModalConfig()}
                    />}
                    </Col>
                </>
            </Admin>
        )
    }
}
export default ServiceRequestConfig;