import ApiConfig from "../../../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../../../library/api/middleware";

const sprintf = require("sprintf-js").sprintf

class ServiceRequestParameters extends React.Component {
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
        this.pageName = "requests_parameters";
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
            pageName: this.pageName,
            data: {
                service_requests: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                },
                requests_parameters: {
                    id: this.state.service_request_id,
                    name: this.state.service_request_name
                },
            }
        }
    }

    getTableData(service_id) {
            return {
                title: "",
                endpoint: ApiConfig.endpoints.serviceRequestParameterList,
                defaultColumnName: "parameter_name",
                defaultColumnLabel: "parameter_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "parameter_name",
                    service_request_id: this.state.service_request_id
                }
            };
    }

    getTableColumns() {
        return [
            {
                name: 'Parameter Name',
                selector: 'parameter_name',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "parameter_name",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/parameter",
                        extraData: {
                            service_request_id: this.state.service_request_id,
                        }
                    }
                },
            },
            {
                name: 'Parameter Value',
                selector: 'parameter_value',
                sortable: true,
                editable: true,
                editableConfig: {
                    field: "parameter_value",
                    fieldType: "text",
                    fieldConfig: {
                        endpoint: "service/request/parameter",
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
                    modalTitle: "Edit Parameter",
                    modalFormName: "requestParams"
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
                    modalTitle: "Delete Parameter",
                    endpoint: "service/request/parameter",
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
                modalForm: ServiceParametersForm,
                config: {
                    service_request_id: this.state.service_request_id
                }
            },
            requestParams: {
                modalForm: ServiceParametersForm,
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
        console.log(this.context)
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={this.pageName}>
                <>
                    <Col sm={12} md={6} lg={5}>
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
export default ServiceRequestParameters;