import React from "react";
import ApiConfig from "../../../config/api-config";
import DeleteForm from "../../../views/components/Forms/DeleteForm";
import DataList from "../../../views/components/Tables/DataList";
import ServiceForm from "../../../views/components/Forms/ServiceForm";
import Link from "next/link";
import Breadcrumbs from "../../../views/components/Headers/Breadcrumbs";
import Container from "react-bootstrap/Container";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";

class ManageServices extends React.Component {
    constructor(props) {
        super(props);

        this.pageName = "manage_services";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName
        }
    }

    getTableData() {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.serviceList,
            defaultColumnName: "service_name",
            defaultColumnLabel: "service_label",
            query: {
                count: 10,
                order: "asc",
                sort: "service_name"
            },
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Service Name',
                selector: 'service_name',
                sortable: true,
            },
            {
                name: 'Service Label',
                selector: 'service_label',
                sortable: true,
            },
            {
                name: 'Category',
                selector: 'category.category_name',
                sortable: true,
            },
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "link",
                text: "Response Keys",
                action: "response_keys",
                href: "/admin/services/%s/response-keys/",
                query: {
                    dynamic: {
                        brackets: false
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
                    modalTitle: "Edit Service",
                    modalFormName: "service"
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
                    modalTitle: "Delete Service",
                    endpoint: "service",
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
                modalForm: ServiceForm
            },
            service: {
                modalForm: ServiceForm
            },
            delete: {
                modalForm: DeleteForm
            }
        };
    }


    render() {
            return (
                <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                    <>
                        <Col sm={12} md={6} lg={6}>
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
export default ManageServices