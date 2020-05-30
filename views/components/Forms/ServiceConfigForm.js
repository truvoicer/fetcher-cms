import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

class ServiceConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_request_id: this.props.config.service_request_id,
            item_name: "",
            item_value: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceRequestConfig, this.props.data.itemId)).then(
                (response) => {
                this.setState({
                    id: response.data.data.id,
                    item_name: response.data.data.item_name,
                    item_value: response.data.data.item_value,
                    service_request_id: response.data.data.service_request.id
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
        console.log(this.state)

        responseHandler(sendData(this.state.action, "service/request/config", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formConfigItemName">
                    <Form.Label>Config Item Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the config item name."
                                  onChange={this.formChangeHandler}
                                  name="item_name"
                                  value={this.state.item_name}/>
                </Form.Group>
                <Form.Group controlId="formConfigItemValue">
                    <Form.Label>Config Item Value</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the config item value."
                                  onChange={this.formChangeHandler}
                                  name="item_value"
                                  value={this.state.item_value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceConfigForm;