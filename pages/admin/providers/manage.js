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

        this.setTableColumns = this.setTableColumns.bind(this);
        this.setProviderData = this.setProviderData.bind(this);
        this.createProvider = this.createProvider.bind(this);
        this.updateProvider = this.updateProvider.bind(this);
        this.deleteProvider = this.deleteProvider.bind(this);
        this.showProperties = this.showProperties.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.providerModal = this.providerModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
        this.newProviderButton = this.newProviderButton.bind(this);
    }

    componentDidMount() {
        this.setState({
            query: {
                count: 10,
                order: "asc",
                sort: "provider_name"
            }
        })
        this.setTableColumns()
        this.setProviderData()
    }

    setProviderData() {
        fetchData(ApiConfig.endpoints.providers, this.state.query).then((response) => {
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
                    cell: row => (
                        <div>
                            <Button variant="primary" size={"sm"} onClick={this.showProperties}
                                    data-provider-id={row.id}>
                                Properties
                            </Button>
                            <Button variant="primary" size={"sm"} onClick={this.updateProvider}
                                    data-provider-id={row.id}>
                                Edit
                            </Button>
                            <Button variant="danger" size={"sm"} onClick={this.deleteProvider}
                                    data-provider-id={row.id}>
                                Delete
                            </Button>
                        </div>
                    )
                    ,
                },
            ]
        });
    }

    formResponse(status, message, data = null) {
        let alertStatus;
        if (status === 200) {
            alertStatus = "success"
        } else {
            alertStatus = "danger"
        }
        this.setState({
            form: {
                submitted: true,
                alertStatus: alertStatus,
                responseMessage: message
            }
        })
        this.setProviderData()
        this.handleClose();
    }

    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        })
    }

    showProperties(e) {
        let data = {
            provider_id: e.target.getAttribute("data-provider-id"),
            endpoint: ApiConfig.endpoints.deleteProvider
        };
        this.setState({
            modal: {
                showModal: true,
                modalTitle: this.propertiesTitle,
                action: 'update',
            }
        });
        this.formTemplate = (<ProviderPropertiesForm data={data} formResponse={this.formResponse}/>)
    }

    deleteProvider(e) {
        let data = {
            provider_id: e.target.getAttribute("data-provider-id"),
            endpoint: ApiConfig.endpoints.deleteProvider
        };
        this.setState({
            modal: {
                showModal: true,
                modalTitle: this.deleteProviderTitle,
                action: 'delete',
                providerId: e.target.getAttribute("data-provider-id"),
            }
        });
        this.formTemplate = (<DeleteForm data={data} formResponse={this.formResponse}/>)
    }

    updateProvider(e) {
        this.setState({
            modal: {
                showModal: true,
                modalTitle: this.updateProviderTitle,
                action: 'update',
            }
        });
        this.formTemplate = (
            <ProviderForm formAction={"update"} providerId={e.target.getAttribute("data-provider-id")}
                          formResponse={this.formResponse}/>
        );
    }

    createProvider(e) {
        this.setState({
            modal: {
                showModal: true,
                modalTitle: this.newProviderTitle,
                action: 'create',
            }
        });
        this.formTemplate = (
            <ProviderForm formAction={"create"} providerId={this.state.modal.providerId}
                          formResponse={this.formResponse}/>
        );
    }

    providerModal() {
        return (
            <Modal show={this.state.modal.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.formTemplate}
                </Modal.Body>
            </Modal>
        );
    }

    newProviderButton() {
        return (
            <Button variant="primary" size={"sm"} onClick={this.createProvider}>
                Add Provider
            </Button>
        );
    }

    render() {
        return (
            <Admin>
                <>
                    <Row>
                        <Col sm={12} md={6} lg={9}>
                            {this.state.form.submitted &&
                            <Alert variant={this.state.form.alertStatus}>
                                {this.state.form.responseMessage}
                            </Alert>
                            }
                            <DataTable
                                title={this.newProviderButton()}
                                columns={this.state.columns}
                                data={this.state.data}
                            />

                            <this.providerModal/>
                        </Col>
                    </Row>
                </>
            </Admin>
        )
    }
}