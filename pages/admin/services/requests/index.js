import ApiConfig from "../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../views/layouts/Admin";

const sprintf = require("sprintf-js").sprintf

class ParameterService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            service_id: false
        }
        this.service_id = ""
        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
        const {service_id} = Router.query;
        console.log(service_id);
        if (!isNaN(service_id)) {
            this.setState({
                showTable: true,
                service_id: service_id
            })
        }
    }

    getTableData(service_id) {
            return {
                title: "",
                endpoint: ApiConfig.endpoints.serviceParameterList,
                defaultColumnName: "parameter_name",
                defaultColumnLabel: "parameter_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "parameter_name",
                    service_id: this.state.service_id
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
                    endpoint: "parameter",
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
                    service_id: this.state.service_id
                }
            },
            requestParams: {
                modalForm: ServiceParametersForm,
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
            <Admin>
                <>
                    {this.state.showTable &&
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableColumnControls={this.getTableColumnControls()}
                        modalConfig={this.getModalConfig()}
                    />}
                </>
            </Admin>
        )
    }
}

export default ParameterService;