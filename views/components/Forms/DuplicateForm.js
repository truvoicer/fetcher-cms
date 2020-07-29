import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import ApiConfig from "../../../config/api-config";

const sprintf = require("sprintf-js").sprintf;

class DuplicateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            item_id: this.props.data.item_id,
            item_name: "",
            item_label: "",
            services: [],
            selectedService: [],
            service_id: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            this.setState({
                services: this.getServicesSelect(response.data.data),
            })
        })
    }

    getServicesSelect(requests) {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_label
            }
        })

    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectChangeHandler(data, e) {
        if(e.name === "service_id") {
            this.setState({
                selectedService: {value: data.value, label: data.label},
                service_id: data.value
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
                <Form.Group controlId="formService">
                    <Form.Label>Service</Form.Label>
                    <Select
                        value={this.state.selectedService}
                        onChange={this.selectChangeHandler}
                        name={"service_id"}
                        options={this.state.services}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default DuplicateForm;