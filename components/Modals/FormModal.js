import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Router from "next/router";
import { sendData } from '../../library/api/middleware'
import Alert from "react-bootstrap/Alert";

export default class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            formSubmitted: false,
            provider_name: "",
            provider_api_base_url: "",
            provider_access_key: "",
            provider_secret_key: ""
        }
        this.handleClose = this.handleClose.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            formSubmitted: false
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submitHandler(e) {
        e.preventDefault();
        sendData(this.props.formEndpoint, this.state).then((response) => {
            if (response.status === 200) {
                this.setState({
                    formSubmitted: true
                })
            }
        });
    }


    handleClose() {
        this.setState({
            showModal: false
        })
    }

    render() {

        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                {this.state.formSubmitted &&
                <Alert variant="success">
                    Successfully addded {this.state.provider_name}.
                </Alert>
                }
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formProviderName">
                            <Form.Label>Provider Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the providers name."
                                          onChange={this.formChangeHandler}
                                          name="provider_name"
                            value={this.state.provider_name} />
                        </Form.Group>
                        <Form.Group controlId="formProviderApiUrl">
                            <Form.Label>Provider Api Base Url</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the providers api base url."
                                          onChange={this.formChangeHandler}
                                          name="provider_api_base_url"
                                          value={this.state.provider_api_base_url}/>
                        </Form.Group>
                        <Form.Group controlId="formProviderAccessKey">
                            <Form.Label>Provider Access Key</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the providers api access key."
                                          onChange={this.formChangeHandler}
                                          name="provider_access_key"
                                          value={this.state.provider_access_key}/>
                        </Form.Group>
                        <Form.Group controlId="formProviderSecretKey">
                            <Form.Label>Provider Api Secret Key</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the providers api secret key."
                                          onChange={this.formChangeHandler}
                                          name="provider_secret_key"
                                          value={this.state.provider_secret_key}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create Provider
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }


}
