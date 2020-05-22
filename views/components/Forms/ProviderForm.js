import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
const sprintf = require("sprintf-js").sprintf;

export default class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.data.action,
            provider_id: "",
            provider_name: "",
            provider_user_id: "",
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
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.provider, this.props.data.itemId)).then((response) => {
                console.log(response);
                this.setState({
                    provider_id: response.data.data.id,
                    provider_name: response.data.data.provider_name,
                    provider_user_id: response.data.data.provider_user_id,
                    provider_api_base_url: response.data.data.provider_api_base_url,
                    provider_access_key: response.data.data.provider_access_key,
                    provider_secret_key: response.data.data.provider_secret_key
                })
            })
        }
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, "provider", this.state),  this.props.formResponse);
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
                <Form.Group controlId="formProviderUserId">
                    <Form.Label>Provider User Id</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers user id."
                                  onChange={this.formChangeHandler}
                                  name="provider_user_id"
                                  value={this.state.provider_user_id}/>
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
