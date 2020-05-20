import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
const sprintf = require("sprintf-js").sprintf;

export default class ApiRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            api_request_id: "",
            api_request_name: "",
            api_request_label: "",
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            this.setState({
                providers: response.data.data,
            })
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.apiRequest, this.props.data.itemId)).then((response) => {
                this.setState({
                    api_request_id: response.data.data.id,
                    api_request_name: response.data.data.api_request_name,
                    api_request_label: response.data.data.api_request_label,
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
        responseHandler(sendData(this.state.action, "request", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formApiRequestName">
                    <Form.Label>Api Request Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the api request name."
                                  onChange={this.formChangeHandler}
                                  name="api_request_name"
                                  value={this.state.api_request_name}/>
                </Form.Group>
                <Form.Group controlId="formApiRequestLabel">
                    <Form.Label>Api Request Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the api request label."
                                  onChange={this.formChangeHandler}
                                  name="api_request_label"
                                  value={this.state.api_request_label}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
