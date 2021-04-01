import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
import {fetchRequest, postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {Alert, Col, Row, Form, Card, Button, Modal} from "react-bootstrap";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";
import {isSet} from "../../../library/utils";
import {Formik} from "formik";
import EntityItemCheckboxes from "../../../views/components/Forms/Exporter/EntityItemCheckboxes";

export const ExporterPageName = "exporter";

const ExporterPage = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(ExporterPageName)
    }, []);

    const [initialFormValues, setInitialFormValues] = useState({});
    const [exportFormList, setExportFormList] = useState([]);
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

    useEffect(() => {
        const values = {};
        exportFormList.forEach(exportItem => {
            values[exportItem.name] = false;
            values[`${exportItem.name}Data`] = [];
        })
        setInitialFormValues(values)
    }, [exportFormList]);

    const buildExportData = (values) => {
        const exportData = [];
        exportFormList.forEach(exportItem => {
            if (values[exportItem.name] && values[`${exportItem.name}Data`].length > 0) {
                exportData.push({
                    export_type: exportItem.name,
                    export_data: values[`${exportItem.name}Data`].map(item => {
                        return {
                            id: parseInt(item)
                        }
                    })
                });
            }
        })
        return exportData;
    }

    const submitHandler = (values) => {
        postRequest({
            endpoint: ApiConfig.endpoints.tools,
            operation: "export",
            requestData: {data: buildExportData(values)},
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
                                    <Formik
                                        initialValues={initialFormValues}
                                        onSubmit={values => submitHandler(values)}
                                        enableReinitialize={true}
                                    >
                                        {({
                                              values,
                                              handleChange,
                                              handleSubmit,
                                          }) => (
                                            <Form onSubmit={handleSubmit}>
                                                {exportFormList.map((exportItem, index) => (
                                                    <React.Fragment key={index}>
                                                        {exportItem.data.length > 0 &&
                                                        <div
                                                            key={index}
                                                             className={`d-flex align-items-center ${index > 0 ? "mt-5" : ""}`}
                                                        >
                                                            <div>
                                                                <div className={"exporter--entities--selector"}>
                                                                    <label
                                                                        className="exporter--entities--selector--label"
                                                                        htmlFor={exportItem.name}
                                                                    >
                                                                        {exportItem.label}
                                                                    </label>
                                                                    <label
                                                                        className="c-switch c-switch-label c-switch-success">
                                                                        <input
                                                                            className="c-switch-input"
                                                                            type="checkbox"
                                                                            id={exportItem.name}
                                                                            name={exportItem.name}
                                                                            onChange={handleChange}
                                                                        />
                                                                        <span
                                                                            className="c-switch-slider"
                                                                            data-checked="✓"
                                                                            data-unchecked="✕"
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className={"exporter--entities--items"}>
                                                                    {values[exportItem.name] &&
                                                                    <button
                                                                        className="btn btn-md btn-ghost-primary active"
                                                                        type="button"
                                                                        aria-pressed="true"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setModalContent(
                                                                                <EntityItemCheckboxes
                                                                                    entityItem={exportItem}
                                                                                />
                                                                            )
                                                                            setShowModal(true)
                                                                        }}
                                                                    >
                                                                        Select {exportItem.label}
                                                                    </button>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        }
                                                    </React.Fragment>
                                                ))}
                                                <div className={"mt-3"}>
                                                    <button type={"submit"} className={"btn btn-primary btn-lg"}>
                                                        Export Data
                                                    </button>
                                                </div>
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
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => {
                                                                setShowModal(false)
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => {
                                                                setShowModal(false)
                                                            }}
                                                        >
                                                            Save changes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </SidebarLayout>
    )
}

export default ExporterPage;