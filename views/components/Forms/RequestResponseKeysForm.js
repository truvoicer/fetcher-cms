import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormList from "./Components/FormList";
import Select from "react-select";
import {isSet, uCaseFirst} from "../../../library/utils";

const sprintf = require("sprintf-js").sprintf;

class RequestResponseKeysForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            key_name: "",
            key_value: "",
            show_in_response: false,
            list_item: false,
            has_array_value: false,
            return_data_type_options: [
                {
                    value: "text",
                    label: "Text"
                },
                {
                    value: "object",
                    label: "Object"
                },
                {
                    value: "array",
                    label: "Array"
                },
            ],
            return_data_type_select: {
                value: "text",
                label: "Text"
            },
            return_data_type: "text",
            array_keys: [],
            service_request_id: this.props.config.service_request_id
        };

        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSelectHandler = this.formSelectHandler.bind(this);
        this.formListCallback = this.formListCallback.bind(this);
        this.fetchRequestResponseResponse = this.fetchRequestResponseResponse.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(
            sprintf(ApiConfig.endpoints.requestResponseKey, this.props.config.service_request_id, this.props.data.itemId)),
            this.fetchRequestResponseResponse);
    }

    fetchRequestResponseResponse(status, message, data) {
        if (status === 200) {
            this.setState({
                id: data.data.id,
                key_name: data.data.key_name,
                key_value: data.data.key_value,
                show_in_response: data.data.show_in_response,
                list_item: data.data.list_item,
                has_array_value: data.data.has_array_value,
                array_keys: data.data.array_keys,
                return_data_type_select: this.getReturnDataType(data.data.return_data_type)
            })
            console.log(data.data.id, this.state.id)
        }
    }

    getReturnDataType(data) {
        console.log(data)
        if (isSet(data) && data !== "" && data !== null && data !== false) {
            return {
                value: data,
                label: uCaseFirst(data)
            }
        }
        return this.state.return_data_type_select;
    }

    formChangeHandler(e) {
        let value = e.target.value;
        if ((e.target.id === "show_in_response" && e.target.checked) ||
            (e.target.id === "list_item" && e.target.checked) ||
            (e.target.id === "has_array_value" && e.target.checked)
        ) {
            value = true;
        } else if ((e.target.id === "show_in_response" && !e.target.checked) ||
            (e.target.id === "list_item" && !e.target.checked) ||
            (e.target.id === "has_array_value" && !e.target.checked)) {
            value = false;
        }
        this.setState({
            [e.target.name]: value
        })
    }
    formSelectHandler(e) {
        this.setState({
            return_data_type_select: {
                value: e.value,
                label: e.label
            },
            return_data_type: e.value
        })
    }
    formSubmitHandler(e) {
        e.preventDefault();
        console.log(this.state)
        responseHandler(sendData(this.state.action, "service/request/response/key", this.state), this.props.formResponse);
    }

    formListCallback(data) {
        this.setState({
            array_keys: data
        })
    }

    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                <Form.Group>
                    <Form.Label>{this.state.key_name}</Form.Label>
                    <Form.Control
                        name={"key_value"}
                        value={this.state.key_value}
                        onChange={this.formChangeHandler}/>
                </Form.Group>
                    <Form.Group controlId="formShowInResponseCheckbox">
                        <Form.Check
                            checked={this.state.show_in_response ? "checked" : ""}
                            type={"checkbox"}
                            id={"show_in_response"}
                            label={"Show in Response?"}
                            name="show_in_response"
                            onChange={this.formChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="formListItemCheckbox">
                        <Form.Check
                            checked={this.state.list_item ? "checked" : ""}
                            type={"checkbox"}
                            id={"list_item"}
                            label={"List Item?"}
                            name="list_item"
                            onChange={this.formChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="formHasArrayValueCheckbox">
                        <Form.Check
                            checked={this.state.has_array_value ? "checked" : ""}
                            type={"checkbox"}
                            id={"has_array_value"}
                            label={"Has Array Value?"}
                            name="has_array_value"
                            onChange={this.formChangeHandler}
                        />
                    </Form.Group>
                    {this.state.has_array_value &&
                    <>
                        <Form.Group>
                            <Form.Label>Return Data Type</Form.Label>
                            <Select
                                value={this.state.return_data_type_select}
                                options={this.state.return_data_type_options}
                                onChange={this.formSelectHandler}
                            />
                        </Form.Group>
                        <FormList callback={this.formListCallback} data={this.state.array_keys}/>
                    </>
                    }
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
            </Form>
    )
    }
    }

    export default RequestResponseKeysForm;