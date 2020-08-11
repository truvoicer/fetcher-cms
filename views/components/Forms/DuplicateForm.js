import {responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const sprintf = require("sprintf-js").sprintf;

class DuplicateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            item_id: this.props.data.item_id,
            item_name: "",
            item_label: "",
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default DuplicateForm;