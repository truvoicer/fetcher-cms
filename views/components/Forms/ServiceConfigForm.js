import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import FormList from "./Components/FormList";
import {isSet, uCaseFirst} from "../../../library/utils";

const sprintf = require("sprintf-js").sprintf;

class ServiceConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            service_request_id: this.props.config.service_request_id,
            item_name: "",
            item_value: "",
            item_array_value: [],
            selectedValueType: {
                label: "Text",
                value: "text"
            },
            selectValueTypes: [
                {
                    label: "Text",
                    value: "text"
                },
                {
                    label: "List",
                    value: "list"
                }
            ]
        }
        this.listRowClass = "form-list--body--row"
        this.listFieldNameClass = "form-list-field-name"
        this.listFieldValueClass = "form-list-field-value"
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.formListCallback = this.formListCallback.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceRequestConfig, this.props.data.itemId)).then(
                (response) => {
                    let data = response.data.data;
                this.setState({
                    id: data.id,
                    item_name: data.item_name,
                    item_value: data.item_value,
                    service_request_id: data.service_request.id,
                    selectedValueType: this.getSelectedValueType(data.value_type),
                    item_array_value: data.item_array_value
                })
            })
        }
    }

    getSelectedValueType(value_type) {
        if (isSet(value_type) && value_type !== "") {
            return {
                value: value_type,
                label: uCaseFirst(value_type)
            }
        }
        return this.state.selectedValueType;
    }
    selectChangeHandler(data) {
        this.setState({
            selectedValueType: data
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formListCallback(data) {
        this.setState({
            item_array_value: data
        })
    }

    submitHandler(e) {
        e.preventDefault();
        let queryData = {
            id: this.state.id,
            service_request_id: this.state.service_request_id,
            selected_value_type: this.state.selectedValueType.value,
            item_name: this.state.item_name,
            item_value: this.state.item_value,
            item_array_value: this.state.item_array_value,
        }
        console.log(queryData)
        responseHandler(sendData(this.state.action, "service/request/config", queryData),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formConfigItemName">
                    <Form.Label>Config Item Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the config item name."
                                  onChange={this.formChangeHandler}
                                  name="item_name"
                                  value={this.state.item_name}/>
                </Form.Group>
                <Form.Group controlId="formValueType">
                    <Form.Label>Value Type</Form.Label>
                    <Select
                        // defaultValue={this.state.selectDefaultValue}
                        // defaultInputValue={"Select value type"}
                        value={this.state.selectedValueType}
                        onChange={this.selectChangeHandler}
                        options={this.state.selectValueTypes}/>
                </Form.Group>
                {this.state.selectedValueType.value === "text" &&
                <Form.Group controlId="formConfigItemValue">
                    <Form.Label>Config Item Value</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the config item value."
                                  onChange={this.formChangeHandler}
                                  name="item_value"
                                  value={this.state.item_value}/>
                </Form.Group>

                }
                {this.state.selectedValueType.value === "list" &&

                <Form.Group controlId="formConfigList">
                    <FormList callback={this.formListCallback}
                              listItemKeyLabel={"Key"}
                              listItemValueLabel={"Value"}
                              addRowLabel={"Add Parameter"}
                              data={this.state.item_array_value}
                    />
                </Form.Group>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceConfigForm;