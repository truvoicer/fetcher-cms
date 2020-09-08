import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import Router from "next/router";
import Admin from "../../../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {fetchData, responseHandler} from "../../../../../../../library/api/middleware";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import FormList from "../../../../../../../views/components/Forms/Components/FormList";
import {isSet} from "../../../../../../../library/utils";

const sprintf = require("sprintf-js").sprintf

export const ServiceRequestTestPageName = "request_test";

const ServiceRequestTest = (props) => {
    const [provider, setProvider] = useState({
        data: {},
        received: false
    });
    const [serviceRequest, setServiceRequest] = useState({
        data: {},
        received: false
    });
    const [requestTypeOptions, setRequestTypeOptions] = useState([]);
    const [queryParameterData, setQueryParameterData] = useState([]);
    const [request, setRequest] = useState({
        show: false,
        resultString: ""
    });
    const [requestType, setRequestType] = useState({
        value: "",
        label: "Select a Request Type"
    });

    useEffect(() => {
        if (isSet(props.provider_id) && isSet(props.service_request_id)) {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id)).then((response) => {
                setProvider({
                    received: true,
                    data: response.data.data
                })
                setRequestTypeOptions(getRequestTypeOptions(response.data.data.service_requests))
            })
            fetchData(sprintf(ApiConfig.endpoints.serviceRequest, props.service_request_id)).then((response) => {
                setServiceRequest({
                    received: true,
                    data: response.data.data
                })
            })
        }
    }, [props.provider_id, props.service_request_id]);

    const getRequestTypeOptions = (serviceRequestList = []) => {
        if (serviceRequestList.length === 0) {
            return [];
        }
        return serviceRequestList.map((item) => {
            return {
                value: item.service_request_name,
                label: item.service_request_label
            }
        })
    }

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ServiceRequestTestPageName,
            data: {
                provider: {
                    id: provider.data.id,
                    name: provider.data.provider_name
                },
                service_requests: {
                    id: serviceRequest.data.id,
                    name: serviceRequest.data.service_request_name
                },
            }
        }
    }

    const selectChangeHandler = (e) => {
        setRequestType({
            value: e.value,
            label: e.label
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let queryData = {
            request_type: requestType.value,
            provider: provider.data.provider_name,
        }
        queryParameterData.map((item) => {
            queryData[item.name] = item.value
        })
        responseHandler(fetchData(ApiConfig.endpoints.serviceApiRequest, queryData),
            getRequestCallback);
    }

    const getRequestCallback = (status, message, data = null) => {
        let result;
        console.log(data)
        if (status === 200) {
            if (data.content_type === "json") {
                result = JSON.stringify(data.request_data, undefined, 4)
            } else if (data.content_type === "xml") {
                result = data.request_data
            }

        } else {
            result = "Error: " + message
        }
        setRequest({
            show: true,
            resultString: result
        })
    }

    const formListCallback = (data) => {
        setQueryParameterData(data)
    }

    return (
        <>
            {serviceRequest.received && provider.received &&
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ServiceRequestTestPageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header>Request Test</Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <Row>
                                        <Col sm={12} md={3} lg={3}>
                                            <Form.Group controlId="formRequestType">
                                                <Form.Label>Request Type</Form.Label>
                                                <Select
                                                    value={requestType}
                                                    options={requestTypeOptions}
                                                    onChange={selectChangeHandler}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formRequestType"
                                                        className={"text-right"}>
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={9} lg={9}>
                                            <Form.Group controlId="formRequestType">
                                                <FormList callback={formListCallback}
                                                          listItemKeyLabel={"Parameter name"}
                                                          listItemValueLabel={"Parameter value"}
                                                          addRowLabel={"Add Parameter"}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                                <Row>
                                    <Col sm={12} md={12} lg={12}>
                                            <textarea className={"request-results"}
                                                      value={request.resultString}
                                                      readOnly={true}>
                                            </textarea>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            </Admin>
            }
        </>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            provider_id: params.provider_id,
            service_request_id: params.service_request_id
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ServiceRequestTest;