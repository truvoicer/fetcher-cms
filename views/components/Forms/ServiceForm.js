import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const sprintf = require("sprintf-js").sprintf;

export default class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_name: "",
            service_label: "",
            selectValue: "",
            category: {}
        }
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            this.setState({
                categories: this.getCategoriesSelect(response.data.data),
            })
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.service, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    service_name: response.data.data.service_name,
                    service_label: response.data.data.service_label,
                    category: response.data.data.category,
                    selectValue: {
                        value: response.data.data.category.id,
                        label: response.data.data.category.category_label
                    }
                })
            })
        }
    }

    getCategoriesSelect(categoryData) {
        return categoryData.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })

    }

    selectChangeHandler(e) {
        this.setState({
            selectValue: {value: e.value, label: e.label},
            category: {
                id: e.value,
            }
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, "service", this.state), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <Row>
                    <Col>
                        <Form.Group controlId="formServiceLabel">
                            <Form.Label>Service Label</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the service label."
                                          onChange={this.formChangeHandler}
                                          name="service_label"
                                          value={this.state.service_label}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formServiceName">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter the service name."
                                          onChange={this.formChangeHandler}
                                          name="service_name"
                                          value={this.state.service_name}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Select
                        value={this.state.selectValue}
                        onChange={this.selectChangeHandler} name={"category_id"} options={this.state.categories}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
