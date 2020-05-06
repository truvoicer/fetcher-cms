import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

export default class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.showModal = false
    }

    componentDidMount() {

    }

    handleClose() {
        this.showModal = false;
    }

    render() {
        this.showModal = this.props.showModal;
        return (
            <Modal show={this.showModal} onHide={this.handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formProviderName">
                            <Form.Label>Provider Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter the providers name." name="provider_name"/>
                        </Form.Group>
                        <Form.Group controlId="formProviderApiUrl">
                            <Form.Label>Provider Api Base Url</Form.Label>
                            <Form.Control type="text" placeholder="Enter the providers api base url."
                                          name="provider_api_base_url"/>
                        </Form.Group>
                        <Form.Group controlId="formProviderAccessKey">
                            <Form.Label>Provider Access Key</Form.Label>
                            <Form.Control type="text" placeholder="Enter the providers api access key."
                                          name="provider_access_key"/>
                        </Form.Group>
                        <Form.Group controlId="formProviderSecretKey">
                            <Form.Label>Provider Api Secret Key</Form.Label>
                            <Form.Control type="text" placeholder="Enter the providers api secret key."
                                          name="provider_secret_key"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                        </Button>
                        <Button variant="primary">
                            Create Provider
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }


}
