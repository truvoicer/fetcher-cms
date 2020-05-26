import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

class ServiceParametersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_id: this.props.config.service_id,
            parameter_name: "",
            parameter_value: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        console.log(this.props)
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceParameter, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    parameter_name: response.data.data.parameter_name,
                    parameter_value: response.data.data.parameter_value,
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

        responseHandler(sendData(this.state.action, "service/parameters", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formParameterName">
                    <Form.Label>Parameter Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the parameter name."
                                  onChange={this.formChangeHandler}
                                  name="parameter_name"
                                  value={this.state.parameter_name}/>
                </Form.Group>
                <Form.Group controlId="formParameterValue">
                    <Form.Label>Parameter Value</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the parameter value."
                                  onChange={this.formChangeHandler}
                                  name="parameter_value"
                                  value={this.state.parameter_value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceParametersForm;