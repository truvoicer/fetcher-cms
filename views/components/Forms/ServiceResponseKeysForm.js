import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

class ServiceResponseKeysForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_id: this.props.config.service_id,
            key_name: "",
            key_value: "",
            show_in_response: false
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceResponseKey, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    service_id: response.data.data.service.id,
                    key_name: response.data.data.key_name,
                    key_value: response.data.data.key_value
                })
            })
        }
    }


    formChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        // console.log(this.state)

        responseHandler(sendData(this.state.action, "service/response/key", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formResponseKeyName">
                    <Form.Label>Response Key Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the Response Key name."
                                  onChange={this.formChangeHandler}
                                  name="key_name"
                                  value={this.state.key_name}/>
                </Form.Group>
                <Form.Group controlId="formResponse KeyValue">
                    <Form.Label>Response Key Value</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the key value."
                                  onChange={this.formChangeHandler}
                                  name="key_value"
                                  value={this.state.key_value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceResponseKeysForm;