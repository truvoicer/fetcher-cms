import Admin from '../../../views/layouts/Admin'
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import Link from "next/link";
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import Breadcrumbs from "../Headers/Breadcrumbs";
import DropdownButton from "react-bootstrap/DropdownButton";
import {isSet} from "../../../library/utils";
import TextField from "./Fields/TextField";

export default class DataList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            query: {},
            table: {},
            data: [],
            modal: {
                showModal: false,
                modalTitle: "",
                action: "",
            },
            alert: {
                showAlert: false,
                alertStatus: "",
                responseMessage: ""
            },
            textField: ""
        }
        this.modalTitle = "";
        this.modalform = "";
        this.modalDynamic = {};
        this.textField = {}
        this.setTableData = this.setTableData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModal = this.getModal.bind(this);
        this.getColumnSwitchable = this.getColumnSwitchable.bind(this);
        this.formResponse = this.formResponse.bind(this);
        this.getTableDataResponseHandler = this.getTableDataResponseHandler.bind(this);
    }

    componentDidMount() {
        this.setTableData()
    }

    setTableData() {
        responseHandler(fetchData(this.props.tableData.endpoint, this.props.tableData.query),
            this.getTableDataResponseHandler);
    }

    getTableDataResponseHandler(status, message, data = null) {
        if (status === 200) {
            this.setState({
                data: data.data
            })
        } else {
            this.setState({
                alert: {
                    showAlert: true,
                    alertStatus: "danger",
                    responseMessage: message
                }
            })
        }
    }

    getTableColumns(columns, controls) {
        let processColumns = columns.map((column, index) => {
            if (isSet(column.editable)) {
                column.cell = row => this.getColumnEditable(row,
                    column.editableConfig)
            }
            return column
        })
        const controlObject = {
            name: 'Controls',
            right: true,
            allowOverflow: true,
            cell: row => this.getColumnControls(controls, row)
        }
        processColumns.push(controlObject);
        return processColumns;
    }

    getColumnControls(controls, row) {
        return (
            <DropdownButton drop={"down"} id={"controls-dropdown"} title={"Controls"}>
                {controls.map((item, index) => {
                    switch (item.control) {
                        case "button":
                            return (
                                this.getButton(item, row, index)
                            )
                        case "link":
                            return this.getLink(item, row, index)
                    }
                })}
            </DropdownButton>
        )
    }

    getColumnEditable(row, config) {
        switch (config.fieldType) {
            case "switch":
                return this.getColumnSwitchable(row, config)
            case "text":
                return <TextField config={config} data={row} updateCallback={this.editableFieldRequest}
                                  formResponseCallback={this.formResponse}/>
            default:
                return row[config.field]
        }
    }

    getColumnSwitchable(row, config) {
        let value = row[config.field]
        if (typeof value === "undefined" || !value) {
            return <a className={"switchable-link"}>
                <i className="fas fa-times" data-value={false}
                   onClick={this.switchableUpdate.bind(this, row, config)}/>
            </a>;
        } else {
            return <a className={"switchable-link"}>
                <i className="fas fa-check" data-value={true}
                   onClick={this.switchableUpdate.bind(this, row, config)}/>
            </a>;
        }
    }

    switchableUpdate(row, config, e) {
        e.preventDefault()
        let dataValue = e.target.getAttribute("data-value");
        if (dataValue === true || dataValue === "true") {
            row[config.field] = false
        } else if (!dataValue || dataValue === "false") {
            row[config.field] = true;
        }
        this.editableFieldRequest(row, config)
    }

    editableFieldRequest(row, config, formResponse = false) {
        let action = "update";
        if (isSet(config.fieldConfig.extraData)) {
            Object.keys(config.fieldConfig.extraData).map((item) => {
                row[item] = config.fieldConfig.extraData[item];
            })
        }
        responseHandler(
            sendData(action,
                config.fieldConfig.endpoint,
                row), (!formResponse) ? this.formResponse : formResponse);
    }

    getButton(item, row, index) {
        return (
            <Dropdown.Item key={"button_" + item.action + "_" + item.location + "_" + row.id.toString() + "_" + index.toString()}
                           variant={item.classes}
                           size={item.size}
                           onClick={this.showModal.bind(this, item, row)}>
                {item.text}
            </Dropdown.Item>
        );
    }

    getQuery(queryObject, row, type = "dynamic") {
        let esc = encodeURIComponent;
        let operator = "/";
        if (type === "params") {
            operator = "=";
        }
        return "?" + Object.keys(queryObject)
            .map(k => {
                let value = queryObject[k];
                if (typeof value === 'object') {
                    return Object.keys(value)
                        .map(l => esc(l) + operator + esc(row[k][value[l]]))
                        .join('&');
                } else {
                    return esc(k) + operator + esc(row[queryObject[k]])
                }
            }).join('&');
    }

    getLink(item, row, index) {
        let href = item.href;
        let linkAs = item.href;
        if (typeof item.query.params !== "undefined") {
            href += this.getQuery(item.query.params, row, "params");
            linkAs = href;
        } else if (typeof item.query.dynamic !== "undefined") {
            if (typeof item.query.dynamic.data !== "undefined") {
                href += this.getQuery(item.query.dynamic.data, row, "dynamic");
            } else {
                if (typeof item.query.dynamic.brackets !== "undefined" && item.query.dynamic.brackets) {
                    href = sprintf(href, "[" + row.id + "]")
                } else {
                    href = sprintf(href, row.id);
                }
                linkAs = href;
            }
        }
        return (
            <Link href={href} as={linkAs} key={"link_" + item.action + "_" + item.location + "_" + row.id.toString() + "_" + index.toString()}>
                <Dropdown.Item href={href}>
                    {item.text}
                </Dropdown.Item>
            </Link>
        );
    }

    showModal(config, row, e) {
        if (!isSet(config.modal) ||
            !isSet(config.modal.showModal) ||
            !config.modal.showModal) {
            return false;
        }
        this.setState({
            modal: {
                showModal: true,
                modalTitle: (isSet(config.modal.modalTitle)) ? config.modal.modalTitle : null,
                endpoint: (isSet(config.modal.endpoint)) ? config.modal.endpoint : null,
                action: config.action,
                itemName: row[this.props.tableData.defaultColumnName],
                itemLabel: row[this.props.tableData.defaultColumnLabel],
                itemId: row.id,
                item_id: row.id,
                modalFormName: (isSet(config.modal.modalFormName)) ? config.modal.modalFormName : null,
            }
        });
    }

    getModalForm(modalFormName) {
        if (typeof modalFormName != "undefined") {
            const ModalForm = this.props.modalConfig[modalFormName].modalForm
            const modalConfig = this.props.modalConfig[modalFormName].config
            return (
                <ModalForm data={this.state.modal} config={modalConfig} formResponse={this.formResponse}/>
            )
        }
        return null;
    }

    formResponse(status, message, data = null) {
        let alertStatus;
        if (status === 200) {
            alertStatus = "success"
        } else {
            alertStatus = "danger"
        }
        this.setTableData();
        this.setState({
            alert: {
                showAlert: true,
                alertStatus: alertStatus,
                responseMessage: message
            }
        })
        this.handleClose();
    }

    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        })
    }

    getModal() {
        return (
            <Modal show={this.state.modal.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getModalForm(this.state.modal.modalFormName)}
                </Modal.Body>
            </Modal>
        );
    }

    createButton() {
        return (
            <Button variant="primary"
                    size={"sm"}
                    onClick={this.showModal}
                    data-action={"create"}
                    data-modal-title={"New"}
                    data-modal-form-name={"default"}>
                New
            </Button>
        );
    }

    render() {
        return (
            <div>
                {this.state.alert.showAlert &&
                <Alert variant={this.state.alert.alertStatus}>
                    {this.state.alert.responseMessage}
                </Alert>
                }
                <DataTable
                    title={this.createButton()}
                    className={"datalist"}
                    striped={true}
                    highlightOnHover={false}
                    responsive={true}
                    overflowY={true}
                    pagination={true}
                    paginationPerPage={10}
                    columns={this.getTableColumns(this.props.tableColumns, this.props.tableColumnControls)}
                    data={this.state.data}
                />
                <this.getModal/>
            </div>
        )
    }
}