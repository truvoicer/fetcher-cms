import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {fetchData, responseHandler, sendData} from "../../../library/api/fetcher-api/fetcher-middleware";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import {isNotEmpty, isSet} from "../../../library/utils";
import TextField from "./Fields/TextField";
import Switcher from "./Fields/Switcher";
import SelectField from "./Fields/SelectField";
import {getColumnControls} from "../../../library/datalist/datalist-actions";
import RowMenu from "./Components/RowMenu";
import ExpandableRow from "./Expandable/ExpandableRow";
import Dropdown from "react-bootstrap/Dropdown";
import SettingsDropdown from "../Dropdowns/SettingsDropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DataList = ({
                      tableSettingsDropdown,
                      tableInlineControls,
                      expandedRowData,
                      tableDropdownControls,
                      tableColumns,
                      tableData,
                      modalConfig,
                      inlineOnly = false,
                      dropdownOnly = true,
                      titleConfig = null
                  }) => {
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
        responseHandler(fetchData(tableData.endpoint, tableData.query),
            getTableDataResponseHandler);
    }
    useEffect(() => {
        setTableData();
    }, [tableData.endpoint, tableData.query])

    const getTableSettingsDropdown = (config = null) => {
        if (config === null) {
            return null;
        }
        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    as={SettingsDropdown}
                />
                <Dropdown.Menu>
                    {config.map((item, index) => (
                        <Dropdown.Item key={index} onClick={showModal.bind(this, item, false)}>Merge Response
                            Keys</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

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
        let allToggle = false;
        let toggleType = null;
        if (inlineOnly) {
            allToggle = true;
            toggleType = "inline"
        }
        let processColumns = columns.map((column, index) => {
            if (isSet(column.controlsColumn) && column.controlsColumn) {
                hasColumnsConfig = true;
                column.cell = row => getColumnControls(dropdownControls, inlineControls, row, showModal, allToggle, toggleType)
            }
            if (isSet(column.editable) && column.editable) {
                column.cell = row => getColumnEditable(row,
                    column.editableConfig)
            }
            return column
        });
        if (!hasColumnsConfig) {
            const controlObject = {
                name: 'Controls',
                allowOverflow: true,
                // maxWidth: "200px",
                flex: 1,
                // hide: "sm",
                cell: row => getColumnControls(dropdownControls, inlineControls, row, showModal, allToggle, toggleType)
            }
            processColumns.push(controlObject);
        }
        return processColumns;
    }

    const getColumnEditable = (row, config) => {
        switch (config?.fieldType) {
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
                if (isSet(config.fieldConfig.extraData[item].key) && isSet(row[config.fieldConfig.extraData[item].key])) {
                    row[item] = row[config.fieldConfig.extraData[item].key];
                } else {
                    row[item] = config.fieldConfig.extraData[item];
                }
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
            itemName: (!row) ? null : row[tableData.defaultColumnName],
            itemLabel: (!row) ? null : row[tableData.defaultColumnLabel],
            itemId: (!row) ? null : row.id,
            item_id: (!row) ? null : row.id,
            modalFormName: (isSet(config.modal.modalFormName)) ? config.modal.modalFormName : null,
            closeModalCallBack: handleClose
        });
    }

    const getModalForm = (modalFormName) => {
        if (typeof modalFormName != "undefined") {
            const ModalForm = modalConfig[modalFormName].modalForm
            const getModalConfig = modalConfig[modalFormName].config
            return (
                <ModalForm data={modal} config={getModalConfig} formResponse={formResponse}/>
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
        let getModalConfig;
        let modalSize = "md";
        if (isNotEmpty(modal?.modalFormName)) {
            getModalConfig = modalConfig[modal.modalFormName].config
            modalSize = getModalConfig?.size || modalSize;
        }

        return (
            <Modal show={modal.showModal} onHide={handleClose} size={modalSize}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {getModalForm(modal.modalFormName)}
                </Modal.Body>
            </Modal>
        );
    }

    const titleModalButton = ({
                                  modalAction = "create",
                                  modalTitle = "New",
                                  buttonTitle = "New",
                                  buttonClass = "btn btn-sm btn-primary",
                                  modalFormName = "default"
                              }) => {
        let config = {
            action: modalAction,
            modal: {
                showModal: true,
                modalTitle: modalTitle,
                modalFormName: modalFormName
            }
        }
        return (
            <button className={buttonClass}
                    onClick={showModal.bind(this, config, false)}>
                {buttonTitle}
            </button>
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
    const getTitleProp = () => {
        switch (titleConfig?.type) {
            case "modal":
            default:
                return titleModalButton({
                    modalAction: titleConfig?.modal?.modalAction,
                    modalFormName: titleConfig?.modal?.modalFormName,
                    modalTitle: titleConfig?.modal?.modalTitle,
                    buttonTitle: titleConfig?.modal?.buttonTitle,
                    buttonClass: titleConfig?.modal?.buttonClass,
                });
            case "text":
                return titleConfig?.text || "";
            case "hide":
                return false;
        }
    }
    const getExtraProps = () => {
        let extraProps = {};
        const titleProp = getTitleProp();
        if (titleProp) {
            extraProps.title = titleProp
        }
        return extraProps
    }
    const tableSettingsDropdownMenu = getTableSettingsDropdown(tableSettingsDropdown);
    return (
        <div>
            {alert.showAlert &&
            <Alert variant={alert.alertStatus}>
                {alert.responseMessage}
            </Alert>
            }
            <div className="card border-success">
                {isNotEmpty(tableSettingsDropdownMenu) &&
                <div className="card-header">
                    <div className="card-header-actions">
                        {tableSettingsDropdownMenu}
                    </div>
                </div>
                }
                <div className="card-body">
                    <DataTable
                        {...getExtraProps()}
                        className={"datalist"}
                        striped={true}
                        highlightOnHover={false}
                        responsive={true}
                        overflowY={true}
                        pagination={true}
                        paginationPerPage={100}
                        columns={getTableColumns(tableColumns, tableDropdownControls,
                            tableInlineControls)}
                        data={data}
                        // onRowClicked={this.rowClickHandler}
                        expandableRows={true}
                        expandableRowsComponent={
                            <ExpandableRow inlineControls={tableInlineControls}
                                           dropdownControls={tableDropdownControls}
                                           showModalCallback={showModal}
                                           expandedRowData={expandedRowData}
                            />
                        }
                    />

                </div>
            </div>
            <GetModal/>
            {rowClicked &&
            <RowMenu inlineControls={tableInlineControls}
                     dropdownControls={tableDropdownControls}
                     style={rowClickedStyle}
                     data={rowData}
                     closeMenuCallback={closeMenu}
                     showModalCallback={showModal}/>

            }

        </div>
    )
}
export default DataList;