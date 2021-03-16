import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import FormList from "../Forms/Components/FormList";
import React, {useEffect, useState} from "react";
import {isObjectEmpty, isSet} from "../../../library/utils";
import {fetchRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {fetchProvider, fetchServiceRequest} from "../../../library/api/helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;

const ApiClient = (props) => {
    const [provider, setProvider] = useState(isSet(props.provider) ? props.provider : {});
    const [serviceRequest, setServiceRequest] = useState(isSet(props.serviceRequest) ? props.serviceRequest : {});

    const [requestTypeOptions, setRequestTypeOptions] = useState([]);
    const [queryParameterData, setQueryParameterData] = useState([]);
    const [requestParameterData, setRequestParameterData] = useState([]);
    const [formListData, setFormListData] = useState([]);

    const [request, setRequest] = useState({
        show: false,
        resultString: ""
    });
    const [requestType, setRequestType] = useState({
        value: "",
        label: "Select a Request Type"
    });

    useEffect(() => {
        setFormListData(requestParameterData.map(parameter => {
            return {
                name: parameter.parameter_name,
                value: parameter.parameter_value,
            }
        }))
    }, [requestParameterData])

    useEffect(() => {
        if (!isObjectEmpty(provider) && !isObjectEmpty(serviceRequest)) {
            setRequestTypeOptions(getRequestTypeOptions(provider.service_requests))
            return;
        }
        if (isSet(props.provider_id) && isSet(props.service_request_id)) {
            fetchProvider({
                providerId: props.provider_id,
                callback: (responseData) => {
                    setProvider({
                        received: true,
                        data: responseData.data
                    })
                    setRequestTypeOptions(getRequestTypeOptions(responseData.data.service_requests))
                }
            })
            fetchServiceRequest({
                providerId: props.provider_id,
                serviceRequestId: props.service_request_id,
                callback: (responseData) => {
                    setServiceRequest({
                        received: true,
                        data: responseData.data
                    })
                }
            })
        }
    }, [props.provider_id, props.service_request_id, props.provider, props.serviceRequest]);

    const getRequestTypeOptions = (serviceRequestList = []) => {
        if (serviceRequestList.length === 0) {
            return [];
        }
        return serviceRequestList.map((item) => {
            return {
                id: item.id,
                value: item.service_request_name,
                label: item.service_request_label
            }
        })
    }


    const parametersFetchRequest = (serviceRequestId) => {
        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequestParameter, provider.id, serviceRequestId),
            operation: `list/single`,
            onSuccess: (responseData) => {
                if (responseData.status === "success" && Array.isArray(responseData?.data?.service_request_parameters)) {
                    setRequestParameterData(responseData.data.service_request_parameters)
                }
            }
        })
    }


    const selectChangeHandler = (e) => {
        setRequestType({
            value: e.value,
            label: e.label
        })

        const findServiceRequest = requestTypeOptions.find(request => e.value === request.value);
        parametersFetchRequest(findServiceRequest.id)
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

        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.serviceRequest, props.provider_id),
            operation: `test-run`,
            data: queryData,
            onSuccess: (responseData) => {
                getRequestCallback(200, responseData.message, responseData.data)
            },
            onError: (error) => {
                getRequestCallback(400, error?.response?.data?.message, error?.response?.data?.data)
            }
        })
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
                                                      data={formListData}
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