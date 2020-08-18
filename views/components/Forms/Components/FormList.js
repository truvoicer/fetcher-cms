import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {isSet} from "../../../../library/utils";

class FormList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: (isSet(this.props.data) &&
                Array.isArray(this.props.data) &&
                this.props.data.length > 0)? this.props.data : [],
            formListData: [],
            listClass: "form-list",
            listGroupClass: "form-list-items",
            listRowClass: "form-list-row",
            listItemKeyClass: "form-list-item-key",
            listItemValueClass: "form-list-item-value",
            addRowLabel: "Add New",
            listItemKeyLabel: "Key",
            listItemValueLabel: "Value"

        }
        this.addFormListRow = this.addFormListRow.bind(this)
        this.removeFormListRow = this.removeFormListRow.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
    }

    addFormListRow(e) {
        let formList = this.state.formList;
        formList.push(this.formListRow())
        this.setState({
            formList: formList
        })
    }

    removeFormListRow(index, e) {
        const itemRow = document.getElementsByClassName("list-item-" + index.toString())
        itemRow[0].remove()
        this.formChangeHandler()
    }

    formListRow(index) {
        return {
            name: "",
            value: ""
        }
    }

    formChangeHandler(e) {
        let listRows = Array.from(document.getElementsByClassName(this.state.listRowClass));
        let queryData = [];
        listRows.map((item, index) => {
            let itemKey = item.getElementsByClassName(this.state.listItemKeyClass)[0];
            let itemValue = item.getElementsByClassName(this.state.listItemValueClass)[0];
            queryData.push({
                name: itemKey.value,
                value: itemValue.value
            })
        })

        this.props.callback(queryData);
    }

    render() {
        return (
            <div className={this.state.listClass}>
                <button className={"btn btn-primary btn-sm add-row-button"}
                        onClick={this.addFormListRow}
                        type={"button"}>
                    {this.props.addRowLabel ? this.props.addRowLabel : this.state.addRowLabel}
                </button>
                <div className={this.state.listGroupClass}>
                    {this.state.formList.map((item, index) => (
                        <div className={this.state.listRowClass + " list-item-" + index.toString()}
                            key={index.toString()}>
                            <Row>
                                <Col sm={12} md={12} lg={5}>
                                    <input
                                        className={this.state.listItemKeyClass}
                                        placeholder={this.props.listItemKeyLabel ? this.props.listItemKeyLabel : this.state.listItemKeyLabel}
                                        defaultValue={item.name}
                                        onChange={this.formChangeHandler}
                                    />
                                </Col>
                                <Col sm={12} md={12} lg={5}>
                                    <input
                                        className={this.state.listItemValueClass}
                                        placeholder={this.props.listItemValueLabel ? this.props.listItemValueLabel : this.state.listItemValueLabel}
                                        defaultValue={item.value}
                                        onChange={this.formChangeHandler}
                                    />
                                </Col>
                                <Col sm={12} md={12} lg={2}>
                                    <a className={"form-list-row--new"} onClick={this.addFormListRow}><i className="fas fa-plus-circle"/></a>
                                    <a className={"form-list-row--remove"} onClick={this.removeFormListRow.bind(this, index)}><i className="fas fa-trash-alt"/></a>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
}

export default FormList;
