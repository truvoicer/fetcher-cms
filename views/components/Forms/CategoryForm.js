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
            id: "",
            category_name: "",
            category_label: "",
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.category, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    category_name: response.data.data.category_name,
                    category_label: response.data.data.category_label,
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


    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, "category", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formCategoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the category name."
                                  onChange={this.formChangeHandler}
                                  name="category_name"
                                  value={this.state.category_name}/>
                </Form.Group>
                <Form.Group controlId="formCategoryLabel">
                    <Form.Label>Category Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the category label."
                                  onChange={this.formChangeHandler}
                                  name="category_label"
                                  value={this.state.category_label}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
