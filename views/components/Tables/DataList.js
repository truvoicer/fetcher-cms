import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import {isSet} from "../../../library/utils";
import TextField from "./Fields/TextField";
import Switcher from "./Fields/Switcher";
import SelectField from "./Fields/SelectField";
import {getColumnControls} from "../../../library/datalist/datalist-actions";
import RowMenu from "./Components/RowMenu";
import ExpandedRow from "./Components/ExpandedRow";

const DataList = (props) => {
    const [modal, setModal] = useState({
        showModal: false,
        modalTitle: "",
        action: "",
    });
    const [alert, setAlert] = useState({
        showAlert: false,
        alertStatus: "",
        responseMessage: ""
    });
    const [data, setData] = useState([]);
    const [rowClicked, setRowClicked] = useState(false);
    const [rowClickedStyle, setRowClickedStyle] = useState({});
    const [rowData, setRowData] = useState({});

    const setTableData = () => {
        responseHandler(fetchData(props.tableData.endpoint, props.tableData.query),
            getTableDataResponseHandler);
    }
    useEffect(() => {
        setTableData();
    }, [props.tableData.endpoint, props.tableData.query])

    const getTableDataResponseHandler = (status, message, data = null) => {
        if (status === 200) {
            setData(data.data)
        } else {
            setAlert({
                showAlert: true,
                alertStatus: "danger",
                responseMessage: message
            });
        }
    }

    const getTableColumns = (columns, dropdownControls = [], inlineControls = []) => {
        let hasColumnsConfig = false;
        let processColumns = columns.map((column, index) => {
            if (isSet(column.controlsColumn) && column.controlsColumn) {
                hasColumnsConfig = true;
                column.cell = row => getColumnControls(dropdownControls, inlineControls, row, showModal)
            }
            if (isSet(column.editable)) {
                column.cell = row => getColumnEditable(row,
                    column.editableConfig)
            }
            return column
        });
        if (!hasColumnsConfig) {
            const controlObject = {
                name: 'Controls',
                allowOverflow: true,
                maxWidth: "200px",
                // hide: "sm",
                cell: row => getColumnControls(dropdownControls, inlineControls, row, showModal)
            }
            processColumns.push(controlObject);
        }
        return processColumns;
    }

    const getColumnEditable = (row, config) => {
        switch (config.fieldType) {
            case "switch":
                return <Switcher config={config} data={row}
                                 updateCallback={editableFieldRequest}
                                 formResponseCallback={formResponse}/>
            case "text":
                return <TextField config={config}
                                  data={row}
                                  updateCallback={editableFieldRequest}
                                  formResponseCallback={formResponse}/>
            case "select":
                return <SelectField config={config}
                                    data={row}
                                    updateCallback={editableFieldRequest}
                                    formResponseCallback={formResponse}/>
            default:
                return (typeof row[config.field] === "string") ? row[config.field] : null
        }
    }

    const editableFieldRequest = (row, config, formResponse = false) => {
        let action = "update";
        if (isSet(config.fieldConfig.extraData)) {
            Object.keys(config.fieldConfig.extraData).map((item) => {
                row[item] = config.fieldConfig.extraData[item];
            })
        }
        responseHandler(
            sendData(action,
                config.fieldConfig.endpoint,
                row), (!formResponse) ? formResponse : formResponse);
    }

    const showModal = (config, row = false, e) => {
        if (!isSet(config.modal) ||
            !isSet(config.modal.showModal) ||
            !config.modal.showModal) {
            return false;
        }
        setModal({
            showModal: true,
            modalTitle: (isSet(config.modal.modalTitle)) ? config.modal.modalTitle : null,
            endpoint: (isSet(config.modal.endpoint)) ? config.modal.endpoint : null,
            action: config.action,
            data: row,
            itemName: (!row) ? null : row[props.tableData.defaultColumnName],
            itemLabel: (!row) ? null : row[props.tableData.defaultColumnLabel],
            itemId: (!row) ? null : row.id,
            item_id: (!row) ? null : row.id,
            modalFormName: (isSet(config.modal.modalFormName)) ? config.modal.modalFormName : null,
            closeModalCallBack: handleClose
        });
    }

    const getModalForm = (modalFormName) => {
        if (typeof modalFormName != "undefined") {
            const ModalForm = props.modalConfig[modalFormName].modalForm
            const modalConfig = props.modalConfig[modalFormName].config
            return (
                <ModalForm data={modal} config={modalConfig} formResponse={formResponse}/>
            )
        }
        return null;
    }

    const formResponse = (status, message, data = null) => {
        let alertStatus;
        if (status === 200) {
            alertStatus = "success"
        } else {
            alertStatus = "danger"
        }
        setTableData();
        handleClose();
        showAlert(alertStatus, message, true);
    }

    const showAlert = (status, message, show) => {
        setAlert({
            showAlert: show,
            alertStatus: status,
            responseMessage: message
        });
    }

    const handleClose = () => {
        setModal({
            showModal: false,
            modalTitle: "",
            action: "",
        })

    }

    const closeMenu = (e) => {
        e.preventDefault();
        setRowClicked(false)
    }

    const GetModal = () => {
        return (
            <Modal show={modal.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {getModalForm(modal.modalFormName)}
                </Modal.Body>
            </Modal>
        );
    }

    const createButton = () => {
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
                    onClick={showModal.bind(this, config, false)}>
                New
            </Button>
        );
    }

    const rowClickHandler = (data, e) => {
        const datalist = document.getElementsByClassName("datalist")[0];
        const rowStyle = {
            top: e.clientY - datalist.getBoundingClientRect().top,
            left: e.clientX - datalist.getBoundingClientRect().left
        }
        setRowClickedStyle(rowStyle);
        setRowClicked(true);
        setRowData(data)
    }

        return (
            <div>
                {alert.showAlert &&
                <Alert variant={alert.alertStatus}>
                    {alert.responseMessage}
                </Alert>
                }
                <DataTable
                    title={createButton()}
                    className={"datalist"}
                    striped={true}
                    highlightOnHover={false}
                    responsive={true}
                    overflowY={true}
                    pagination={true}
                    paginationPerPage={100}
                    columns={getTableColumns(props.tableColumns, props.tableDropdownControls,
                             props.tableInlineControls)}
                    data={data}
                    // onRowClicked={this.rowClickHandler}
                    expandableRows={true}
                    expandableRowsComponent={
                        <ExpandedRow inlineControls={props.tableInlineControls}
                                     dropdownControls={props.tableDropdownControls}
                                     showModalCallback={showModal}/>
                    }
                />
                <GetModal/>
                {rowClicked &&
                <RowMenu inlineControls={props.tableInlineControls}
                         dropdownControls={props.tableDropdownControls}
                         style={rowClickedStyle}
                         data={rowData}
                         closeMenuCallback={closeMenu}
                         showModalCallback={showModal}/>

                }

            </div>
        )
}
export default DataList;