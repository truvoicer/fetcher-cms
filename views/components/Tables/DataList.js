import Admin from '../../../views/layouts/Admin'
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import Link from "next/link";
import { fetchData, responseHandler } from "../../../library/api/middleware";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import Breadcrumbs from "../Headers/Breadcrumbs";
import DropdownButton from "react-bootstrap/DropdownButton";

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
            }
        }
        this.modalTitle = "";
        this.modalform = "";
        this.modalDynamic = {};
        this.setTableData = this.setTableData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModal = this.getModal.bind(this);
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
        console.log(status, message, data)
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
        const controlObject = {
            name: 'Controls',
            right: true,
            allowOverflow: true,
            cell: row => this.getColumnControls(controls, row)
        }
        columns.push(controlObject);
        return columns;
    }

    getColumnControls(controls, row) {
        return (
            <DropdownButton drop={"down"} id={"controls-dropdown"} title={"Controls"}>
                {controls.map((item, index) => {
                    switch (item.control) {
                        case "button":
                            return (
                                this.getButton(item, row)
                            )
                        case "link":
                            return this.getLink(item, row)
                    }
                })}
            </DropdownButton>
        )
    }

    getButton(item, row) {
        let modal = false;

        if (typeof item.modal != "undefined") {
            modal = item.modal;
        }
        return (
            <Dropdown.Item key={"button_" + item.action + row.id.toString()}
                variant={item.classes}
                size={item.size}
                data-item-id={row.id}
                data-item-name={row[this.props.tableData.defaultColumnName]}
                data-item-label={row[this.props.tableData.defaultColumnLabel]}
                data-action={item.action}
                data-delete-endpoint={modal && modal.endpoint ? modal.endpoint : null}
                data-modal-title={modal && modal.modalTitle ? modal.modalTitle : null}
                data-modal-form-name={modal && modal.modalFormName ? modal.modalFormName : null}
                onClick={modal && modal.showModal ? this.showModal : null} >
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
    getLink(item, row) {
        let href = item.href;
        let linkAs = item.href;
        if (typeof item.query.params !== "undefined") {
            href += this.getQuery(item.query.params, row, "params");
            linkAs = href;
        }
        else if (typeof item.query.dynamic !== "undefined") {
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
            <Link href={href} as={linkAs} key={"link_" + item.action + row.id.toString()}>
                <Dropdown.Item href={href}>
                    {item.text}
                </Dropdown.Item>
            </Link>
        );
    }
    showModal(e) {
        this.setState({
            modal: {
                showModal: true,
                modalTitle: e.target.getAttribute("data-modal-title"),
                endpoint: e.target.getAttribute("data-delete-endpoint"),
                action: e.target.getAttribute("data-action"),
                itemName: e.target.getAttribute("data-item-name"),
                itemLabel: e.target.getAttribute("data-item-label"),
                itemId: e.target.getAttribute("data-item-id"),
                item_id: e.target.getAttribute("data-item-id"),
                modalFormName: e.target.getAttribute("data-modal-form-name"),
            }
        });
    }
    getModalForm(modalFormName) {
        if (typeof modalFormName != "undefined") {
            const ModalForm = this.props.modalConfig[modalFormName].modalForm
            const modalConfig = this.props.modalConfig[modalFormName].config
            return (
                <ModalForm data={this.state.modal} config={modalConfig} formResponse={this.formResponse} />
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
                    striped={true}
                    highlightOnHover={false}
                    responsive={true}
                    overflowY={true}
                    columns={this.getTableColumns(this.props.tableColumns, this.props.tableColumnControls)}
                    data={this.state.data}
                />
                <this.getModal />
            </div>
        )
    }
}