import ApiConfig from "../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../views/layouts/Admin";
import ProviderPropertiesForm from "../../../../views/components/Forms/ProviderPropertiesForm";

const sprintf = require("sprintf-js").sprintf

class ProviderProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            provider_id: false
        }
        this.provider_id = ""
        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
        const {provider_id} = Router.query;
        if (!isNaN(provider_id)) {
            this.setState({
                showTable: true,
                provider_id: provider_id
            })
        }
    }

    getTableData() {
            return {
                title: "",
                endpoint: sprintf(ApiConfig.endpoints.providerPropertyList, this.state.provider_id),
                defaultColumnName: "property_value",
                defaultColumnLabel: "property_value",
                query: {
                    count: 10,
                    order: "asc",
                    sort: "property_name",
                    service_id: this.state.provider_id
                }
            };
    }

    getTableColumns() {
        return [
            {
                name: 'Property Name',
                selector: 'property_name',
                sortable: true,
            },
            {
                name: 'Property Value',
                selector: 'property_value',
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
                    modalTitle: "Edit Property Value",
                    modalFormName: "providerProperty",
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
                    modalTitle: "Delete Property",
                    endpoint: "provider/property",
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
                modalForm: ProviderPropertiesForm,
                config: {
                    provider_id: this.state.provider_id
                }
            },
            providerProperty: {
                modalForm: ProviderPropertiesForm,
                config: {
                    provider_id: this.state.provider_id
                }
            },
            delete: {
                modalForm: DeleteForm,
                config: {
                    provider_id: this.state.provider_id
                }
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

export default ProviderProperties;