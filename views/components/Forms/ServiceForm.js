import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Select from 'react-select';
const sprintf = require("sprintf-js").sprintf;

export default class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            provider_id: "",
            id: "",
            service_name: "",
            service_label: "",
            selectValue: ""
        }
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            this.setState({
                providers: this.getProvidersSelect(response.data.data),
            })
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.service, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    service_name: response.data.data.service_name,
                    service_label: response.data.data.service_label,
                    provider_id: response.data.data.provider.id,
                    selectValue: {
                        value: response.data.data.provider.id,
                        label: response.data.data.provider.provider_name
                    }
                })
            })
        }
    }

    getProvidersSelect(providerData) {
        return providerData.map((item, index) => {
            return {
                value: item.id,
                label: item.provider_name
            }
        })

    }

    selectChangeHandler(e) {
        this.setState({
            selectValue: {value: e.value, label: e.label},
            provider_id: e.value
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        console.log(this.state)
        responseHandler(sendData(this.state.action, "service", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formServiceName">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the service name."
                                  onChange={this.formChangeHandler}
                                  name="service_name"
                                  value={this.state.service_name}/>
                </Form.Group>
                <Form.Group controlId="formServiceLabel">
                    <Form.Label>Service Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the service label."
                                  onChange={this.formChangeHandler}
                                  name="service_label"
                                  value={this.state.service_label}/>
                </Form.Group>
                <Form.Group controlId="formProvider">
                    <Form.Label>Provider</Form.Label>
                    <Select
                        value={this.state.selectValue}
                        onChange={this.selectChangeHandler} name={"provider_id"} options={this.state.providers} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
