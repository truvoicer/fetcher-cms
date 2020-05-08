import Form from "react-bootstrap/Form";
import React from "react";
import {sendData} from '../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../config/api";

export default class ProviderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.formAction,
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
            endpoint = ApiConfig.endpoints.createProperty;
        } else if (this.state.action === "update") {
            endpoint = ApiConfig.endpoints.updateProperty;
        }
        sendData(endpoint, this.state).then((response) => {
            this.props.formResponse(response.status, response.data.message);
        });
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
