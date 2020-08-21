import ApiConfig from "../../../../../../../config/api-config";
import React from "react";
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

const sprintf = require("sprintf-js").sprintf

class ServiceRequestTest extends React.Component {

    static pageName = "request_test";

    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    getStaticProps() {
        return {
            props: {}, // will be passed to the page component as props
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            service_request_id: "",
            service_request_name: "",
            provider_id: "",
            provider_name: "",
            provider: "",
            request_type: {
                value: "",
                label: "Select a Request Type"
            },
            request_type_options: [],
            service_request: {},
            service_request_list: [],
            query: "",
            limit: "",
            request: {
                show: false,
                resultString: ""
            },
            queryParameterData: []
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
        this.getRequestCallback = this.getRequestCallback.bind(this)
        this.formListCallback = this.formListCallback.bind(this)
    }

    componentDidMount() {
        const {provider_id, service_request_id} = Router.query;
        this.setState({
            showTable: true,
            service_request_id: service_request_id,
            provider_id: provider_id,
        })

        fetchData(sprintf(ApiConfig.endpoints.provider, provider_id)).then((response) => {
            this.setState({
                provider_id: response.data.data.id,
                provider_name: response.data.data.provider_name,
                provider: response.data.data.provider_name,
                request_type_options: this.getRequestTypeOptions(response.data.data.service_requests)
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.serviceRequest, service_request_id)).then((response) => {
            this.setState({
                service_request_name: response.data.data.service_request_name,
                service_request: response.data.data
            })
        })

    }

    getRequestTypeOptions(serviceRequests = []) {
        if (serviceRequests.length === 0) {
            return [];
        }
        return serviceRequests.map((item) => {
            return {
                value: item.service_request_name,
                label: item.service_request_label
            }
        })
    }

    getBreadcrumbsConfig() {
        return {
            pageName: ServiceRequestTest.pageName,
            data: {
                service_requests: {
                    id: this.state.service_request_id,
                    name: this.state.service_request_name
                },
                provider: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                }
            }
        }
    }

    selectChangeHandler(e) {
        this.setState({
            request_type: {
                value: e.value,
                label: e.label
            }
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        let queryData = {
            request_type: this.state.request_type.value,
            provider: this.state.provider,
        }
        this.state.queryParameterData.map((item) => {
            queryData[item.name] = item.value
        })
        responseHandler(fetchData(ApiConfig.endpoints.serviceApiRequest, queryData),
            this.getRequestCallback);
    }

    getRequestCallback(status, message, data = null) {
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
        this.setState({
            request: {
                resultString: result
            }
        })
    }

    formListCallback(data) {
        this.setState({
            queryParameterData: data
        })
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={ServiceRequestTest.pageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header>Request Test</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.submitHandler}>
                                    <Row>
                                        <Col sm={12} md={3} lg={3}>
                                            <Form.Group controlId="formRequestType">
                                                <Form.Label>Request Type</Form.Label>
                                                <Select
                                                    value={this.state.request_type}
                                                    options={this.state.request_type_options}
                                                    onChange={this.selectChangeHandler}
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
                                                <FormList callback={this.formListCallback}
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
                                                      value={this.state.request.resultString}
                                                      readOnly={true}>
                                            </textarea>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            </Admin>
        )
    }
}

export default ServiceRequestTest;