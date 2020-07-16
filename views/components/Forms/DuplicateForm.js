import {responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

class DuplicateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            item_id: this.props.data.item_id,
            item_name: "",
            item_label: "",
            selectedRequestType: [],
            requestTypes: [
                {
                    value: "get",
                    label: "Get"
                },
                {
                    value: "search",
                    label: "Search"
                }
            ]
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {

    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectChangeHandler(data, e) {
        if (e.name === "service_request_type") {
            this.setState({
                selectedRequestType: {value: data.value, label: data.label},
                service_request_type: data.value
            })
        }
    }


    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData("duplicate", this.props.data.endpoint, this.state), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <Form.Group controlId="formItemLabel">
                    <Form.Label>Item Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the item label."
                                  onChange={this.formChangeHandler}
                                  name="item_label"
                                  value={this.state.item_label}/>
                </Form.Group>
                <Form.Group controlId="formItemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the item name."
                                  onChange={this.formChangeHandler}
                                  name="item_name"
                                  value={this.state.item_name}/>
                </Form.Group>
                <Form.Group controlId="formRequestType">
                    <Form.Label>Request Type</Form.Label>
                    <Select
                        value={this.state.selectedRequestType}
                        onChange={this.selectChangeHandler} name={"service_request_type"} options={this.state.requestTypes}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default DuplicateForm;