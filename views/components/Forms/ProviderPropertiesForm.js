import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const sprintf = require("sprintf-js").sprintf;

class ProviderPropertiesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            property_id: "",
            property_name: "",
            property_label: "",
            property_value: "",
            provider_id: this.props.config.provider_id
        };

        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchProviderPropertiesResponse = this.fetchProviderPropertiesResponse.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(
            sprintf(ApiConfig.endpoints.providerProperty, this.props.config.provider_id, this.props.data.itemId)),
            this.fetchProviderPropertiesResponse);
    }

    fetchProviderPropertiesResponse(status, message, data) {
        if (status === 200) {
            this.setState({
                id: data.data.property_id,
                property_id: data.data.property_id,
                property_name: data.data.property_name,
                property_label: data.data.property_label,
                property_value: data.data.property_value,
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
        responseHandler(sendData(this.state.action, "provider/property", this.state), this.props.formResponse);
    }

    render() {
        let label = sprintf("%s (%s)", this.state.property_label, this.state.property_name)
        return (
            <Form onSubmit={this.formSubmitHandler}>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        name={"property_value"}
                        value={this.state.property_value}
                        onChange={this.formChangeHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
    }
}

export default ProviderPropertiesForm;