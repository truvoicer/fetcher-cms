import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const sprintf = require("sprintf-js").sprintf;

class RequestResponseKeysForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            key_id: "",
            key_name: "",
            key_value: "",
            service_request_id: this.props.config.service_request_id
        };

        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchRequestResponseResponse = this.fetchRequestResponseResponse.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(
            sprintf(ApiConfig.endpoints.requestResponseKey, this.props.config.service_request_id, this.props.data.itemId)),
            this.fetchRequestResponseResponse);
    }

    fetchRequestResponseResponse(status, message, data) {
        if (status === 200) {
            this.setState({
                id: data.data.key_id,
                key_id: data.data.key_id,
                key_name: data.data.key_name,
                key_value: data.data.key_value,
            })
        }
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, "service/request/response/key", this.state), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                <Form.Group>
                    <Form.Label>{this.state.key_name}</Form.Label>
                    <Form.Control
                        name={"key_value"}
                        value={this.state.key_value}
                        onChange={this.formChangeHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
    }
}

export default RequestResponseKeysForm;