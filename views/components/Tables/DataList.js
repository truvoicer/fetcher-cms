import Admin from '../../../views/layouts/Admin'
import ApiConfig from '../../../config/api-config'
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import React from "react";
import Link from "next/link";
import {fetchData} from "../../../library/api/middleware";
import DeleteForm from "../Forms/DeleteForm";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
const sprintf = require("sprintf-js").sprintf

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
                action: ""
            },
            form: {
                submitted: false,
                alertStatus: "",
                responseMessage: ""
            }
        }
        this.modalTitle = "";
        this.modalform = "";
        // this.getTableColumns = this.getTableColumns.bind(this);
        this.setTableData = this.setTableData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModal = this.getModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
    }

    componentDidMount() {
        this.setTableData(this.props.tableData.endpoint, this.props.tableData.query)
    }

    setTableData(endpoint, query) {
        fetchData(this.props.tableData.endpoint, this.props.tableData.query).then((response) => {
            this.setState({
                data: response.data.data
            })
        })
    }

    getTableColumns(columns, controls) {
        const controlObject = {
            name: 'Controls',
            right: true,
            cell: row => this.getColumnControls(controls, row)
        }
        columns.push(controlObject);
        return columns;
    }

    getColumnControls(controls, row) {
        return controls.map((item, index) => {
            switch (item.control) {
                case "button":
                    return this.getButton(item, row.id)
                case "link":
                    return this.getLink(item, row.id)
            }
        });
    }

    getButton(item, item_id) {
        let modal = false;
        if (typeof item.modal != "undefined") {
            modal = item.modal;
        }
        return (
            <Button variant={item.classes}
                    size={item.size}
                    data-item-id={item_id}
                    data-action={item.action}
                    data-delete-endpoint={modal && modal.endpoint  ? modal.endpoint : null}
                    data-modal-title={modal && modal.modalTitle  ? modal.modalTitle : null}
                    data-modal-form-name={modal && modal.modalFormName  ? modal.modalFormName : null}
                    onClick={modal && modal.showModal  ? this.showModal : null} >
                {item.text}
            </Button>
        );
    }
    getLink(item, item_id) {
        return (
            <Link href={item.href + item_id}>
                <a className={item.classes}>
                    {item.text}
                </a>
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
                    itemId: e.target.getAttribute("data-item-id"),
                    modalFormName: e.target.getAttribute("data-modal-form-name")
                }
            });
    }
    getModalForm(modalFormName) {
        if (typeof modalFormName != "undefined") {
            const ModalForm = this.props.modalConfig[modalFormName].modalForm
            return (
                <ModalForm data={this.state.modal} formResponse={this.formResponse}/>
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
            form: {
                submitted: true,
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
            <Admin>
                <>
                    {this.state.form.submitted &&
                    <Alert variant={this.state.form.alertStatus}>
                        {this.state.form.responseMessage}
                    </Alert>
                    }
                    <DataTable
                        title={this.createButton()}
                        columns={this.getTableColumns(this.props.tableColumns, this.props.tableColumnControls)}
                        data={this.state.data}
                    />
                    <this.getModal/>
                </>
            </Admin>
        )
    }
}