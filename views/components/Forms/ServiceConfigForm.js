import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

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
            listItems: [],
            selectedValueType: {
                label: "Select a value type",
                value: ""
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
        this.addListRow = this.addListRow.bind(this);
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
                    item_value: this.getItemValue(data.item_value, data.value_type),
                    service_request_id: data.service_request.id,
                    selectedValueType: {
                        value: data.value_type,
                        label: data.value_type.charAt(0).toUpperCase() + data.value_type.slice(1)
                    },
                    listItems: this.getListItems(data.item_value, data.value_type)
                })
            })
        }
    }
    getItemValue(itemValue, valueType) {
        if (valueType === "list") {
            return ""
        }
        return itemValue;
    }

    getListItems(itemValue, valueType) {
        if (valueType === "list") {
            return JSON.parse(itemValue).map((item, index) => {
                return this.listRowElement(item.name, item.value)
            })
        }
        return [];
    }
    listRowElement(nameValue = "", value = "") {
        return (
            <>
                <Form.Control type="text"
                              className={this.listFieldNameClass}
                              placeholder="Enter list item name."
                              defaultValue={nameValue}
                />
                <Form.Control type="text"
                              className={this.listFieldValueClass}
                              placeholder="Enter list item value."
                              defaultValue={value}
                />
            </>
        )
    }
    addListRow(e) {
        e.preventDefault()
        let listItems = this.state.listItems;
         listItems.push(this.listRowElement())
        this.setState({
            listItems: listItems
        })
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

    getListArray() {
        let listRows = Array.from(document.getElementsByClassName(this.listRowClass));
        let listArray = listRows.map((row, index) => {
            let nameField = row.getElementsByClassName(this.listFieldNameClass)[0];
            let valueField = row.getElementsByClassName(this.listFieldValueClass)[0];
            return {
                name: nameField.value,
                value: valueField.value
            }
        })
        return listArray;
    }

    submitHandler(e) {
        e.preventDefault();
        let itemValue;
        if (this.state.selectedValueType.value === "list") {
            itemValue = this.getListArray();
        } else if (this.state.selectedValueType.value === "text") {
            itemValue = this.state.item_value
        }

        let queryData = {
            id: this.state.id,
            service_request_id: this.state.service_request_id,
            selected_value_type: this.state.selectedValueType.value,
            item_name: this.state.item_name,
            item_value: itemValue,
        }
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
                    <div className={"form-list"}>
                        {this.state.listItems.length > 0 &&
                        <Form.Label>List Items</Form.Label>
                        }
                        <div className={"form-list--body"}>
                            {this.state.listItems.map((item, index) => (
                                <div key={index} className={this.listRowClass}>{item}</div>
                            ))}
                        </div>
                        <button className={"btn btn-primary btn-sm"} onClick={this.addListRow}>
                            Add List Item
                        </button>
                    </div>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}

export default ServiceConfigForm;