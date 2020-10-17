import React, {useEffect, useState} from "react";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import ApiConfig from "../../../config/api-config";
import {Alert} from "react-bootstrap";

const sprintf = require("sprintf-js").sprintf

export const ExporterPageName = "exporter";

const ExporterPage = (props) => {
    const [exportFormList, setExportFormList] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [response, setResponse] = useState({
        show: false,
        success: false,
        message: "",
        data: []
    });

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            setExportFormList(exportFormList => {
                let cloneList = [...exportFormList];
                cloneList.push({
                    show: false,
                    id: "id",
                    name: "services",
                    label: "Services",
                    nameField: "service_name",
                    labelField: "service_label",
                    data: response.data.data
                })
                return cloneList;
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            setExportFormList(exportFormList => {
                let cloneList = [...exportFormList];
                cloneList.push({
                    show: false,
                    id: "id",
                    name: "categories",
                    label: "Categories",
                    nameField: "category_name",
                    labelField: "category_label",
                    data: response.data.data
                })
                return cloneList;
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            setExportFormList(exportFormList => {
                let cloneList = [...exportFormList];
                cloneList.push({
                    show: false,
                    id: "id",
                    name: "providers",
                    label: "Providers",
                    nameField: "provider_name",
                    labelField: "provider_label",
                    data: response.data.data
                })
                return cloneList;
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.propertyList)).then((response) => {
            setExportFormList(exportFormList => {
                let cloneList = [...exportFormList];
                cloneList.push({
                    show: false,
                    id: "id",
                    name: "properties",
                    label: "Properties",
                    nameField: "property_name",
                    labelField: "property_label",
                    data: response.data.data
                })
                return cloneList;
            })
        })
    }, []);

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ExporterPageName,
        }
    }

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
        sendData("tools", "export", {data: exportData})
            .then(response => {
                if (response.data.status === "success") {
                    setResponse({
                        show: true,
                        success: true,
                        message: response?.data?.message,
                        data: response?.data?.data
                    })
                } else if (response.data.status === "error") {
                    setResponse({
                        show: true,
                        success: false,
                        message: response?.data?.message,
                        data: response?.data?.data
                    })
                } else {
                    console.error(response?.data)
                }
            })
            .catch(error => {
                setResponse({
                    show: true,
                    success: false,
                    message: error?.response?.data?.message,
                    data: error?.response?.data?.data
                })
                console.error(error?.response)
            })
    }
    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ExporterPageName}>
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
                            <h4>Available Exports</h4>
                            <Form onSubmit={submitHandler}>
                                {exportFormList.map((exportItem, index) => (
                                    <Row key={index} className={index > 0 ? "mt-5" : ""}>
                                        <Col sm={12} md={2} lg={2}>
                                            <div className={"form-group"}>
                                                <div className="form-check checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        id={exportItem.name}
                                                        type="checkbox"
                                                        name={exportItem.name}
                                                        value={exportItem.name}
                                                        onChange={formTypeCheckHandler.bind(this, exportItem.name)}
                                                    />
                                                    <label className="form-check-label"
                                                           htmlFor={exportItem.name}>
                                                        {exportItem.label}
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={4} lg={4}>
                                            {exportItem.show && exportItem.data.map((dataItem, dataItemIndex) => (
                                                <div key={dataItemIndex} className={"form-check checkbox" + (dataItemIndex > 0 ? "mt-2" : "")}>
                                                    <input
                                                        className="form-check-input"
                                                        id={dataItem[exportItem.nameField]}
                                                        name={dataItem[exportItem.nameField]}
                                                        type="checkbox"
                                                        value={dataItem[exportItem.id]}
                                                        onClick={
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
                                        </Col>
                                    </Row>
                                ))}
                                <Row>
                                    <Col sm={12} md={2} lg={2}>
                                        <button type={"submit"} className={"btn btn-primary btn-lg"}>
                                            Export Data
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Admin>
    )
}

export default ExporterPage;