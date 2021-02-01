import Admin from "../../layouts/Admin";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import FormList from "../Forms/Components/FormList";
import React, {useEffect, useState} from "react";
import {isObjectEmpty, isSet} from "../../../library/utils";
import {fetchData, responseHandler} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";

const ApiClient = (props) => {
    const [provider, setProvider] = useState(isSet(props.provider)? props.provider : {});
    const [serviceRequest, setServiceRequest] = useState(isSet(props.serviceRequest)? props.serviceRequest : {});

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
        if (!isObjectEmpty(provider) && !isObjectEmpty(serviceRequest)) {
            setRequestTypeOptions(getRequestTypeOptions(provider.service_requests))
            return;
        }
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
    }, [props.provider_id, props.service_request_id, props.provider, props.serviceRequest]);

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
            provider: provider.provider_name,
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
            {!isObjectEmpty(serviceRequest) && !isObjectEmpty(provider) &&
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
            }
        </>
    )
}

export default ApiClient;