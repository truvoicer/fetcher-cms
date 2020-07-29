import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Select from "react-select";

const sprintf = require("sprintf-js").sprintf;

export default class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.data.action,
            id: "",
            provider_label: "",
            provider_name: "",
            provider_user_id: "",
            provider_api_base_url: "",
            provider_access_key: "",
            provider_secret_key: "",
            selectedCategories: [],
            allCategories: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
    }

    componentDidMount() {

        this.setState({
            formSubmitted: false
        })

        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            this.setState({
                allCategories: this.getCategoriesSelect(response.data.data),
            })
        })

        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.provider, this.props.data.itemId)).then((response) => {
                console.log(response);
                this.setState({
                    id: response.data.data.id,
                    provider_label: response.data.data.provider_label,
                    provider_name: response.data.data.provider_name,
                    provider_user_id: response.data.data.provider_user_id,
                    provider_api_base_url: response.data.data.provider_api_base_url,
                    provider_access_key: response.data.data.provider_access_key,
                    provider_secret_key: response.data.data.provider_secret_key,
                    selectedCategories: this.getCategoriesSelect(response.data.data.category)
                })
            })
        }
    }

    getCategoriesSelect(data) {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })

    }

    selectChangeHandler(e) {
        this.setState({
            selectedCategories: e,
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
        responseHandler(sendData(this.state.action, "provider", this.state), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <Form.Group controlId="formProviderLabel">
                    <Form.Label>Provider Label</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers label."
                                  onChange={this.formChangeHandler}
                                  name="provider_label"
                                  value={this.state.provider_label}/>
                </Form.Group>
                <Form.Group controlId="formProviderName">
                    <Form.Label>Provider Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers name."
                                  onChange={this.formChangeHandler}
                                  name="provider_name"
                                  value={this.state.provider_name}/>
                </Form.Group>
                <Form.Group controlId="formProviderApiUrl">
                    <Form.Label>Provider Api Base Url</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers api base url."
                                  onChange={this.formChangeHandler}
                                  name="provider_api_base_url"
                                  value={this.state.provider_api_base_url}/>
                </Form.Group>
                <Form.Group controlId="formProviderUserId">
                    <Form.Label>Provider User Id</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers user id."
                                  onChange={this.formChangeHandler}
                                  name="provider_user_id"
                                  value={this.state.provider_user_id}/>
                </Form.Group>
                <Form.Group controlId="formProviderAccessKey">
                    <Form.Label>Provider Access Key</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers api access key."
                                  onChange={this.formChangeHandler}
                                  name="provider_access_key"
                                  value={this.state.provider_access_key}/>
                </Form.Group>
                <Form.Group controlId="formProviderSecretKey">
                    <Form.Label>Provider Api Secret Key</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the providers api secret key."
                                  onChange={this.formChangeHandler}
                                  name="provider_secret_key"
                                  value={this.state.provider_secret_key}/>
                </Form.Group>
                <Form.Group controlId="formCategories">
                    <Form.Label>Categories</Form.Label>
                    <Select
                        value={this.state.selectedCategories}
                        onChange={this.selectChangeHandler}
                        name={"category_id"}
                        options={this.state.allCategories}
                        isMulti={true}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
