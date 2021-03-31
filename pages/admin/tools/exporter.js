import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
import {fetchRequest, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {Alert, Col, Row, Form, Card, Button, Modal} from "react-bootstrap";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";
import {isSet} from "../../../library/utils";

export const ExporterPageName = "exporter";

const ExporterPage = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(ExporterPageName)
    }, []);

    const [exportFormList, setExportFormList] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [response, setResponse] = useState({
        show: false,
        success: false,
        message: "",
        data: []
    });

    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.tools,
            operation: `export/list`,
            onSuccess: (responseData) => {
                setExportFormList(responseData.data)
            }
        })
    }, []);

    const getListIndex = (exportItemName, compareKey, list) => {
        let listIndex = false;
        list.map((item, index) => {
            if (item[compareKey] === exportItemName) {
                listIndex = index;
            }
        })
        return listIndex;
    }

    const formCheckHandler = (exportItemName, id, label, e) => {
        setExportData(exportData => {
            let cloneData = [...exportData];
            const listIndex = getListIndex(exportItemName, "export_type", exportData);
            if (listIndex === false) {
                cloneData.push({
                    export_type: exportItemName,
                    export_data: [{
                        id: id
                    }]
                });
            } else {
                const getId = cloneData[listIndex].export_data.filter(item => item.id === id);
                if (getId.length === 0) {
                    cloneData[listIndex].export_data.push({id: id})
                } else {
                    const getIdIndex = getListIndex(id, "id", cloneData[listIndex].export_data);
                    cloneData[listIndex].export_data.splice(getIdIndex, 1);
                }
            }
            return cloneData
        })
    }

    const formTypeCheckHandler = (exportItemName, e) => {
        setExportFormList(exportFormList => {
            let cloneList = [...exportFormList];
            const listIndex = getListIndex(exportItemName, "name", exportFormList);
            if (listIndex !== false) {
                cloneList[listIndex].show = !cloneList[listIndex].show;
            }
            return cloneList;
        })
    }

    const validateExportData = (exportData) => {
        if (exportData.length === 0) {
            return false
        }
        return true;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!validateExportData(exportData)) {
            return false;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.tools,
            operation: "export",
            requestData: {data: exportData},
            onSuccess: (responseData) => {
                if (responseData.status === "success") {
                    setResponse({
                        show: true,
                        success: true,
                        message: responseData?.message,
                        data: responseData?.data
                    })
                } else if (responseData.status === "error") {
                    setResponse({
                        show: true,
                        success: false,
                        message: responseData?.message,
                        data: responseData?.data
                    })
                } else {
                    console.error(responseData)
                }
            },
            onError: (error) => {
                setResponse({
                    show: true,
                    success: false,
                    message: error?.response?.data?.message,
                    data: error?.response?.data?.data
                })
                console.error(error?.response)
            }
        })
    }
    const isChecked = (id, type) => {
        const findExportItem = exportData.find(item => item.export_type === type);
        if (!isSet(findExportItem)) {
            return false;
        }
        const findId = findExportItem.export_data.find(item => item.id === id);
        return isSet(findId);
    }
    return (
        <SidebarLayout pageName={ExporterPageName}>
            <div className={"exporter"}>
                <Card>
                    <Card.Header>Exporter</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={12}>
                                {response.show &&
                                <Alert variant={response.success ? "success" : "danger"}>
                                    <p>{response.message}</p>

                                    {Array.isArray(response.data) && response.data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.status === "success" ?
                                                <div>
                                                    <p>
                                                        {item.message} <br/>
                                                        <a target={"_BLANK"} href={item.file_url}>{item.file_url}</a>
                                                    </p>
                                                </div>
                                                :
                                                <div>
                                                    <p>{item.message}</p>
                                                </div>
                                            }
                                        </React.Fragment>
                                    ))}
                                </Alert>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <div className={"exporter--entities"}>
                                    <h4>Available Exports</h4>
                                    <Form onSubmit={submitHandler}>
                                        {exportFormList.map((exportItem, index) => (
                                            <React.Fragment key={index}>
                                                {exportItem.data.length > 0 &&
                                                <Row key={index} className={index > 0 ? "mt-5" : ""}>
                                                    <Col sm={12} md={2} lg={2}>
                                                        <div className={"exporter--entities--selector"}>
                                                            <label
                                                                className="exporter--entities--selector--label"
                                                                htmlFor={exportItem.name}
                                                            >
                                                                {exportItem.label}
                                                            </label>
                                                            <label className="c-switch c-switch-label c-switch-success">
                                                                <input
                                                                    className="c-switch-input"
                                                                    type="checkbox"
                                                                    id={exportItem.name}
                                                                    name={exportItem.name}
                                                                    value={exportItem.name}
                                                                    onChange={formTypeCheckHandler.bind(this, exportItem.name)}
                                                                />
                                                                <span
                                                                    className="c-switch-slider"
                                                                    data-checked="✓"
                                                                    data-unchecked="✕"
                                                                />
                                                            </label>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={4} lg={4}>
                                                        <div className={"exporter--entities--items"}>
                                                            {exportItem.show &&
                                                                <button
                                                                    className="btn btn-md btn-ghost-primary active"
                                                                    type="button"
                                                                    aria-pressed="true"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setModalContent(
                                                                            <>
                                                                                {exportItem.show && exportItem.data.map((dataItem, dataItemIndex) => (
                                                                                    <div key={dataItemIndex}
                                                                                         className={"form-check checkbox" + (dataItemIndex > 0 ? "mt-2" : "")}>
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            id={dataItem[exportItem.nameField]}
                                                                                            name={dataItem[exportItem.nameField]}
                                                                                            type="checkbox"
                                                                                            value={dataItem[exportItem.id]}
                                                                                            checked={isChecked(dataItem.id, exportItem.name)}
                                                                                            onChange={
                                                                                                formCheckHandler.bind(
                                                                                                    this,
                                                                                                    exportItem.name,
                                                                                                    dataItem[exportItem.id],
                                                                                                    exportItem.label)
                                                                                            }
                                                                                        />
                                                                                        <label className="form-check-label"
                                                                                               htmlFor={dataItem[exportItem.nameField]}>
                                                                                            {dataItem[exportItem.labelField]}
                                                                                        </label>
                                                                                    </div>
                                                                                ))}
                                                                            </>
                                                                        )
                                                                        setShowModal(true)
                                                                    }}
                                                                >
                                                                    Select {exportItem.label}
                                                                </button>
                                                            }

                                                        </div>
                                                    </Col>
                                                </Row>
                                                }
                                            </React.Fragment>
                                        ))}
                                        <Row>
                                            <Col sm={12} md={2} lg={2}>
                                                <button type={"submit"} className={"btn btn-primary btn-lg"}>
                                                    Export Data
                                                </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Modal
                    show={showModal}
                    onHide={() => {
                        setShowModal(false)
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Select Items</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {modalContent}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </SidebarLayout>
    )
}

export default ExporterPage;