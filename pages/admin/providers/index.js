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

        this.pageName = "manage_providers";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);

    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName,
        }
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
                name: 'Category/s',
                sortable: true,
                right: false,
                cell: row => {
                    let array = [];
                    for (let i=0;i<row.category.length;i++) {
                        array.push(row.category[i].category_label);
                    }
                    return array.join(", ");
                }
            },
            {
                name: 'Provider Label',
                selector: 'provider_label',
                sortable: true,
                right: false,
            },
            {
                name: 'Api Base Url',
                selector: 'provider_api_base_url',
                sortable: true,
                right: false,
            },
            {
                name: 'Provider User Id',
                selector: 'provider_user_id',
                sortable: true,
                right: false,
            },
            {
                name: 'Access key',
                selector: 'provider_access_key',
                sortable: true,
                right: false,
            },
            {
                name: 'Secret key',
                selector: 'provider_secret_key',
                sortable: true,
                right: false,
            },
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "link",
                text: "Requests",
                action: "requests",
                href: "/admin/providers/%s/requests/",
                query: {
                    dynamic: {
                        brackets: false
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
            },
            {
                control: "link",
                text: "Modify Properties",
                action: "properties",
                href: "/admin/providers/%s/properties/",
                query: {
                    dynamic: {
                        brackets: false,
                    }
                },
                size: "sm",
                classes: "btn btn-outline-primary btn-sm"
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
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={this.pageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                    <DataList
                        tableData={this.getTableData()}
                        tableColumns={this.getTableColumns()}
                        tableColumnControls={this.getTableColumnControls()}
                        modalConfig={this.getModalConfig()}
                    />
                    </Col>
                </>
            </Admin>
        )
    }
}