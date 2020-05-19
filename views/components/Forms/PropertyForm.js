import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, responseHandler, fetchData} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
const sprintf = require("sprintf-js").sprintf;

export default class ProviderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.data.action,
            property_id: "",
            property_name: "",
            property_label: "",
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            formSubmitted: false
        })

        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.property, this.props.data.itemId)).then((response) => {
                this.setState({
                    property_id: response.data.data.id,
                    property_name: response.data.data.property_name ,
                    property_label: response.data.data.property_label ,
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
        responseHandler(sendData(this.state.action, "property", this.state), this.props.formResponse)
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formProperty">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the property name."
                                  onChange={this.formChangeHandler}
                                  name="property_name"
                                  value={this.state.property_name}/>
                </Form.Group>
                <Form.Group controlId="formProviderApiUrl">
                    <Form.Label>Property Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the property label."
                                  onChange={this.formChangeHandler}
                                  name="property_label"
                                  value={this.state.property_label}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
