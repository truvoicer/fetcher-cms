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
            properties: [],
            providerProperties: [],
            propertyData: [],
            form: {
                data: {}
            }
        };

        this.propertyData = [];
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formResponseHandler = this.formResponseHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchPropertiesResponse = this.fetchPropertiesResponse.bind(this);
        this.fetchProviderPropertiesResponse = this.fetchProviderPropertiesResponse.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(ApiConfig.endpoints.properties), this.fetchPropertiesResponse);
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.providerProperties, this.props.data.provider_id)),
            this.fetchProviderPropertiesResponse);
    }

    fetchPropertiesResponse(status, message, data) {
        if (status === 200) {
            this.setState({
                properties: data.data
            })
        }
    }

    fetchProviderPropertiesResponse(status, message, data) {
        if (status === 200) {
            this.setState({
                providerProperties: data.data
            })
        }
    }

    formResponseHandler(status, message, data) {
        console.log(status, message, data);
    }

    formChangeHandler(e) {
        console.log(e.target.name)
        console.log(e.target.value)
        // e.target.name = e.target.value;
    }

    formSubmitHandler(e) {
        e.preventDefault();
        let allProperties = this.state.properties;
        let propertyDataArray = allProperties.map((property, index) => {
            let input = document.getElementById(property.property_name)
            return {
                property_id: parseInt(input.getAttribute("data-property-id")),
                property_value: input.value
            }
        });

        let data = {
            data: [
                {
                    provider_id: parseInt(this.props.data.provider_id),
                    property_data: propertyDataArray
                }
            ]
        }
        responseHandler(sendData("create", "provider/properties", data), this.props.formResponse);
    }

    getProviderProperty(providerId, propertyId, providerProperties) {
        let formData = this.state.form.data;
        for (let i = 0; i < providerProperties.length; i++) {
            if (parseInt(providerId) === providerProperties[i].provider.id &&
                propertyId === providerProperties[i].property.id) {
                return providerProperties[i];
            }
        }
        return false;
    }

    buildFormItems() {
        let properties = this.state.properties;
        if (properties.length > 0) {
            return properties.map((item, index) => {
                let label = item.property_label + " (" + item.property_name + ")";
                let placeholderText = "Enter " + item.property_label;
                let providerProperties = this.getProviderProperty(
                    this.props.data.provider_id, item.id,
                    this.state.providerProperties);
                return (
                    <Form.Group>
                        <Form.Label>{label}</Form.Label>
                        <Form.Control
                            placeholder={placeholderText}
                            id={item.property_name}
                            name={item.property_name}
                            value={providerProperties.property_value}
                            data-property-id={item.id}
                            onChange={this.formChangeHandler}/>
                    </Form.Group>
                );
            });
        }
    }

    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                {this.buildFormItems()}
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
    }
}

export default ProviderPropertiesForm;