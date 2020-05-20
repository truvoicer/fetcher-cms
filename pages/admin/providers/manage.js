import Admin from '../../../views/layouts/Admin'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api-config'
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ProviderForm from "../../../views/components/Forms/ProviderForm";
import Alert from "react-bootstrap/Alert";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ProviderPropertiesForm from "../../../views/components/Forms/ProviderPropertiesForm";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import DataList from "../../../views/components/Tables/DataList";

export default class ManageProviders extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            columns: [],
            query: {},
            data: [],
            tableTitle: "",
            modal: {
                showModal: false,
                modalTitle: "",
                action: "",
                providerId: ""
            },
            form: {
                submitted: false,
                alertStatus: "",
                responseMessage: "",
            }
        }
        this.formTemplate = "";
        this.newProviderTitle = "New Provider";
        this.updateProviderTitle = "Update Provider";
        this.deleteProviderTitle = "Delete Provider";
        this.propertiesTitle = "Provider Properties";

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);

        // this.setTableColumns = this.setTableColumns.bind(this);
        // this.setProviderData = this.setProviderData.bind(this);
        // this.createProvider = this.createProvider.bind(this);
        // this.updateProvider = this.updateProvider.bind(this);
        // this.deleteProvider = this.deleteProvider.bind(this);
        // this.showProperties = this.showProperties.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.providerModal = this.providerModal.bind(this);
        // this.formResponse = this.formResponse.bind(this);
        // this.newProviderButton = this.newProviderButton.bind(this);
    }
    getTableData() {
        return {
            endpoint: ApiConfig.endpoints.providerList,
            query: {
                count: 10,
                order: "asc",
                sort: "provider_name"
            }
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Provider Name',
                selector: 'provider_name',
                sortable: true,
            },
            {
                name: 'Api Base Url',
                selector: 'provider_api_base_url',
                sortable: true,
                right: true,
            },
            {
                name: 'Access key',
                selector: 'provider_access_key',
                sortable: true,
                right: true,
            },
            {
                name: 'Secret key',
                selector: 'provider_secret_key',
                sortable: true,
                right: true,
            },
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "button",
                text: "Properties",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Properties",
                    modalFormName: "providerProperties"
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Provider",
                    modalFormName: "provider"
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
                    modalTitle: "Delete Provider",
                    modalFormName: "delete",
                    endpoint: "provider"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }

    getModalConfig() {
        return {
            default: {
                modalForm: ProviderForm
            },
            provider: {
                modalForm: ProviderForm
            },
            providerProperties: {
                modalForm: ProviderPropertiesForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    render() {
        return (
            <DataList
                tableData={this.getTableData()}
                tableColumns={this.getTableColumns()}
                tableColumnControls={this.getTableColumnControls()}
                modalConfig={this.getModalConfig()}
            />
        )
    }
}