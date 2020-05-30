import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

class ServiceRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_id: "",
            provider_id: this.props.config.provider_id,
            service_request_name: "",
            service_request_label: ""
        }
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        console.log(this.props)
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            this.setState({
                services: this.getServicesSelect(response.data.data),
            })
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceRequest, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    service_id: response.data.data.service.id,
                    provider_id: response.data.data.provider.id,
                    service_request_name: response.data.data.service_request_name,
                    service_request_label: response.data.data.service_request_label,
                })
            })
        }
    }

    getServicesSelect(requests) {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_name
            }
        })

    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectChangeHandler(e) {
        this.setState({
            selectValue: {value: e.value, label: e.label},
            service_id: e.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        console.log(this.state)

        responseHandler(sendData(this.state.action, "service/request", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formRequestName">
                    <Form.Label>Request Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the request Key name."
                                  onChange={this.formChangeHandler}
                                  name="service_request_name"
                                  value={this.state.service_request_name}/>
                </Form.Group>
                <Form.Group controlId="formRequestLabel">
                    <Form.Label>Request Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the request label."
                                  onChange={this.formChangeHandler}
                                  name="service_request_label"
                                  value={this.state.service_request_label}/>
                </Form.Group>
                <Form.Group controlId="formService">
                    <Form.Label>Service</Form.Label>
                    <Select
                        value={this.state.selectValue}
                        onChange={this.selectChangeHandler} name={"service_id"} options={this.state.services} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceRequestForm;