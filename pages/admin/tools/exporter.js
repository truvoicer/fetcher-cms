import React, {useEffect, useState} from "react";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {fetchData} from "../../../library/api/middleware";
import ApiConfig from "../../../config/api-config";

const sprintf = require("sprintf-js").sprintf

export const ExporterPageName = "exporter";

const ExporterPage = (props) => {
    const exportItems = [
        {
            name: "providers",
            label: "Providers"
        },
        {
            name: "categories",
            label: "Categories"
        },
        {
            name: "services",
            label: "Services"
        },
    ];

    const [exportData, setExportData] = useState({});
    const [providers, setProviders] = useState({
        data: [],
        show: false
    });
    const [categories, setCategories] = useState({
        data: [],
        show: false
    });
    const [services, setServices] = useState({
        data: [],
        show: false
    });

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            setServices({
                show: false,
                data: response.data.data
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            setCategories({
                show: false,
                data: response.data.data
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            setProviders({
                show: false,
                data: response.data.data
            })
        })
    }, []);

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ExporterPageName,
        }
    }

    const getData = (exportItemName) => {
        switch (exportItemName) {
            case "categories":
                return (
                    <>
                        {categories.show && categories.data.map((category, index) => (
                            <React.Fragment key={index}>
                                {getCheckBoxListItem(
                                    exportItemName,
                                    category.id,
                                    category.category_label
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )
            case "providers":
                return (
                    <>
                        {providers.show && providers.data.map((provider, index) => (
                            <React.Fragment key={index}>
                                {getCheckBoxListItem(
                                    exportItemName,
                                    provider.id,
                                    provider.provider_label
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )
            case "services":
                return (
                    <>
                        {services.show && services.data.map((service, index) => (
                            <React.Fragment key={index}>
                                {getCheckBoxListItem(
                                    exportItemName,
                                    service.id,
                                    service.service_label
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )
        }
    }
    const getCheckBoxListItem = (exportItemName, id, label) => {
        return (
            <div className="form-check checkbox">
                <input
                    className="form-check-input"
                    id={exportItemName}
                    name={exportItemName + "[]"}
                    type="checkbox"
                    value={id}
                    onClick={formCheckHandler.bind(this, exportItemName, id, label)}
                />
                <label className="form-check-label"
                       htmlFor={exportItemName}>
                    {label}
                </label>
            </div>
        )
    }

    const formCheckHandler = (exportItemName, id, label, e) => {
        setExportData(exportData => {

        })
        console.log(exportItemName, id, label)
    }

    const formTypeCheckHandler = (e) => {
        switch (e.target.value) {
            case "categories":
                setCategories(categories => {
                    return {
                        show: !categories.show,
                        data: categories.data
                    }
                });
                break;
            case "providers":
                setProviders(providers => {
                    return {
                        show: !providers.show,
                        data: providers.data
                    }
                });
                break;
            case "services":
                setServices(services => {
                    return {
                        show: !services.show,
                        data: services.data
                    }
                });
                break;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // let queryData = {
        //     request_type: requestType.value,
        //     provider: provider.data.provider_name,
        // }
        // queryParameterData.map((item) => {
        //     queryData[item.name] = item.value
        // })
        // responseHandler(fetchData(ApiConfig.endpoints.serviceApiRequest, queryData),
        //     getRequestCallback);
    }

    return (
        <>
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ExporterPageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header>Exporter</Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    {exportItems.map((exportItem, index) => (
                                        <Row key={index}>
                                            <Col sm={12} md={2} lg={2}>
                                                <div className={"form-group"}>
                                                    <div className="form-check checkbox">
                                                        <input
                                                            className="form-check-input"
                                                            id={exportItem.name}
                                                            type="checkbox"
                                                            name={exportItem.name}
                                                            value={exportItem.name}
                                                            onChange={formTypeCheckHandler}
                                                        />
                                                        <label className="form-check-label"
                                                               htmlFor={exportItem.name}>
                                                            {exportItem.label}
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={12} md={7} lg={7}>
                                                {getData(exportItem.name)}
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
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            </Admin>
        </>
    )
}

export default ExporterPage;