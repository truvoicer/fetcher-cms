import ApiConfig from "../../../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";

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
            provider_id: "",
        }
        this.pageName = "requests_parameters";
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
                service_requests: [
                    this.state.provider_id
                ]
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
            },
            {
                name: 'Parameter Value',
                selector: 'parameter_value',
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
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                <>
                    <Col sm={12} md={6} lg={5}>
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
export default ServiceRequestParameters;