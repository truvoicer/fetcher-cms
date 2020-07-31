import ApiConfig from "../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../views/layouts/Admin";
import ServiceResponseKeysForm from "../../../../../views/components/Forms/ServiceResponseKeysForm";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/middleware";

const sprintf = require("sprintf-js").sprintf

class ServiceResponseKeys extends React.Component {

    static pageName = "response_keys";
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
            service_id: "",
            service_name: ""
        }
        this.service_id = ""
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableDropdownControls = this.getTableDropdownControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
        const {service_id} = Router.query;
        this.setState({
            showTable: true,
            service_id: service_id
        })
        fetchData(sprintf(ApiConfig.endpoints.service, service_id)).then((response) => {
            this.setState({
                service_name: response.data.data.service_name,
            })
        })
    }

    getBreadcrumbsConfig() {
        return {
            pageName: ServiceResponseKeys.pageName,
            data: {
                manage_services: {
                    id: this.state.service_id,
                    name: this.state.service_name
                }
            }
        }
    }

    getTableData(service_id) {
            return {
                title: "",
                endpoint: ApiConfig.endpoints.serviceResponseKeyList,
                defaultColumnName: "key_name",
                defaultColumnLabel: "key_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "key_name",
                    service_id: this.state.service_id
                }
            };
    }

    getTableColumns() {
        return [
            {
                name: 'Response Key Name',
                selector: 'key_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "key_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/response/key",
                        extraData: {
                            service_id: this.state.service_id
                        }
                    }
                },
            },
            {
                name: 'Response Key Value',
                selector: 'key_value',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "key_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/response/key",
                        extraData: {
                            service_id: this.state.service_id
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
                    modalTitle: "Edit Response Key",
                    modalFormName: "responseKeys"
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
                    endpoint: "service/response/key",
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
                modalForm: ServiceResponseKeysForm,
                config: {
                    service_id: this.state.service_id
                }
            },
            responseKeys: {
                modalForm: ServiceResponseKeysForm,
                config: {
                    service_id: this.state.service_id
                }
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }


    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ServiceResponseKeys.pageName}>
                <>
                    <Col sm={12} md={6} lg={6}>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableDropdownControls={this.getTableDropdownControls()}
                        modalConfig={this.getModalConfig()}
                    />}
                    </Col>
                </>
            </Admin>
        )
    }
}

export default ServiceResponseKeys;