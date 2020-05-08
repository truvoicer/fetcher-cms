import Form from "react-bootstrap/Form";
import React from "react";
import {sendData} from '../../library/api/middleware'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import ApiConfig from "../../config/api";

export default class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.formAction,
            provider_name: "",
            provider_api_base_url: "",
            provider_access_key: "",
            provider_secret_key: ""
        }
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

    submitHandler(e) {
        e.preventDefault();
        let endpoint;
        if (this.state.action === "create") {
            endpoint = ApiConfig.endpoints.createProvider;
        } else if (this.state.action === "update") {
            endpoint = ApiConfig.endpoints.updateProvider;
        }
        sendData(endpoint, this.state).then((response) => {
            this.props.formResponse(response.status, response.data.message);
        });
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formProviderName">
                    <Form.Label>Provider Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers name."
                                  onChange={this.formChangeHandler}
                                  name="provider_name"
                                  value={this.state.provider_name}/>
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
