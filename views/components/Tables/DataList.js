import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import React from "react";
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import {isSet} from "../../../library/utils";
import TextField from "./Fields/TextField";
import ControlsDropdown from "./Components/ControlsDropdown";
import Switcher from "./Fields/Switcher";
import ControlsInlineButton from "./Components/ControlsInlineButton";
import SelectField from "./Fields/SelectField";
import ExpandedRow from "./Components/ExpandedRow";
import {getColumnControls} from "../../../library/datalist/datalist-actions";
import RowMenu from "./Components/RowMenu";

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
            rowClicked: false,
            rowClickedStyle: {},
            rowData: {}
        }
        this.setTableData = this.setTableData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModal = this.getModal.bind(this);
        this.formResponse = this.formResponse.bind(this);
        this.getTableDataResponseHandler = this.getTableDataResponseHandler.bind(this);
        this.rowClickHandler = this.rowClickHandler.bind(this);
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

    getTableColumns(columns, dropdownControls = [], inlineControls = []) {
        let hasColumnsConfig = false;
        let processColumns = columns.map((column, index) => {
            if (isSet(column.controlsColumn) && column.controlsColumn) {
                hasColumnsConfig = true;
                column.cell = row => getColumnControls(dropdownControls, inlineControls, row, this.showModal)
            }
            if (isSet(column.editable)) {
                column.cell = row => this.getColumnEditable(row,
                    column.editableConfig)
            }
            return column
        });
        if (!hasColumnsConfig) {
            const controlObject = {
                name: 'Controls',
                right: true,
                allowOverflow: true,
                // hide: "sm",
                cell: row => getColumnControls(dropdownControls, inlineControls, row, this.showModal)
            }
            processColumns.push(controlObject);
        }
        return processColumns;
    }

    getColumnEditable(row, config) {
        switch (config.fieldType) {
            case "switch":
                return <Switcher config={config} data={row}
                                 updateCallback={this.editableFieldRequest}
                                 formResponseCallback={this.formResponse}/>
            case "text":
                return <TextField config={config}
                                  data={row}
                                  updateCallback={this.editableFieldRequest}
                                  formResponseCallback={this.formResponse}/>
            case "select":
                return <SelectField config={config}
                                    data={row}
                                    updateCallback={this.editableFieldRequest}
                                    formResponseCallback={this.formResponse}/>
            default:
                return (typeof row[config.field] === "string") ? row[config.field] : null
        }
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

    showModal(config, row = false, e) {
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
                itemName: (!row) ? null : row[this.props.tableData.defaultColumnName],
                itemLabel: (!row) ? null : row[this.props.tableData.defaultColumnLabel],
                itemId: (!row) ? null : row.id,
                item_id: (!row) ? null : row.id,
                modalFormName: (isSet(config.modal.modalFormName)) ? config.modal.modalFormName : null,
                closeModalCallBack: this.handleClose
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

    closeMenu(e) {
        e.preventDefault();
        this.setState({
            rowClicked: false
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
        let config = {
            action: "create",
            modal: {
                showModal: true,
                modalTitle: "New",
                modalFormName: "default"
            }
        }
        return (
            <Button variant="primary"
                    size={"sm"}
                    onClick={this.showModal.bind(this, config, false)}>
                New
            </Button>
        );
    }

    rowClickHandler(data, e) {
        const datalist = document.getElementsByClassName("datalist")[0];
        const rowStyle = {
            top: e.clientY - datalist.getBoundingClientRect().top,
            left: e.clientX - datalist.getBoundingClientRect().left
        }
        this.setState({
            rowClicked: true,
            rowClickedStyle: rowStyle,
            rowData: data
        })
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
                    responsive={false}
                    overflowY={true}
                    pagination={true}
                    paginationPerPage={10}
                    onRowClicked={this.rowClickHandler}
                    expandableRows={false}
                    expandableRowsComponent=
                        <ExpandedRow inlineControls={this.props.tableInlineControls}
                    dropdownControls={this.props.tableDropdownControls}
                    showModalCallback={this.showModal}/>
                columns={this.getTableColumns(this.props.tableColumns, this.props.tableDropdownControls,
                this.props.tableInlineControls)}
                data={this.state.data}
                />
                <this.getModal/>
                {this.state.rowClicked &&
                <RowMenu inlineControls={this.props.tableInlineControls}
                         dropdownControls={this.props.tableDropdownControls}
                         style={this.state.rowClickedStyle}
                         data={this.state.rowData}
                         closeMenuCallback={this.closeMenu}
                         showModalCallback={this.showModal}/>

                }

            </div>
        )
    }
}