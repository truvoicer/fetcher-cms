import AdminLayout from '../../../layouts/AdminLayout'
import DataTable from 'react-data-table-component';
import {fetchData} from '../../../library/api/middleware'
import ApiConfig from '../../../config/api'
import FormModal from '../../../components/Modals/FormModal'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";

export default class ManageProviders extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            columns: [],
            data: [],
            modal: {
                showModal: false,
                modalTitle: "Create Provider",
                form: {
                    endpoint: ApiConfig.endpoints.createProvider
                }
            }

        }
        this.setTableColumns = this.setTableColumns.bind(this);
        this.setProviderData = this.setProviderData.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.setTableColumns()
        this.setProviderData()
    }

    setProviderData() {
        let query = {
            count: 10,
            order: "asc",
            sort: "provider_name"
        };
        fetchData(ApiConfig.endpoints.providers, query).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    setTableColumns() {
        this.setState({
            columns: [
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
                {
                    name: 'Controls',
                    right: true,
                    cell: row =>
                        <Button variant="primary" size={"sm"} onClick={this.handleShow}>
                            Edit
                        </Button>,
                },
            ]
        });
    }

    handleShow() {
        this.setState({
            showModal: true
        });
    }

    render() {
        return (
            <AdminLayout>
                <>
                    <Button variant="primary" size={"sm"} onClick={this.handleShow}>
                        Add Provider
                    </Button>
                    <FormModal showModal={this.state.showModal}
                               formEndpoint={this.state.modal.form.endpoint}
                               modalTitle={this.state.modal.modalTitle}/>
                    <DataTable
                        title="Providers"
                        columns={this.state.columns}
                        data={this.state.data}
                    />

                </>
            </AdminLayout>
        )
    }
}