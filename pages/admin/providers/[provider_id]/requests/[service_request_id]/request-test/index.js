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

const sprintf = require("sprintf-js").sprintf

class ServiceRequestTest extends React.Component {
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
            service_request: {},
            item_id: "",
            keywords: "",
            limit: "",
            request: {
                show: false,
                resultString: ""
            }
        }
        this.pageName = "request_test";
        this.submitHandler = this.submitHandler.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.getRequestCallback = this.getRequestCallback.bind(this)
    }

    componentDidMount() {
        const {provider_id, service_request_id} = Router.query;
        this.setState({
            showTable: true,
            service_request_id: service_request_id,
            provider_id: provider_id
        })

        fetchData(sprintf(ApiConfig.endpoints.provider, provider_id)).then((response) => {
            this.setState({
                provider_id: response.data.data.id,
                provider_name: response.data.data.provider_name,
                provider: response.data.data.provider_name
            })
        })
        fetchData(sprintf(ApiConfig.endpoints.serviceRequest, service_request_id)).then((response) => {
            this.setState({
                service_request_name: response.data.data.service_request_name,
                service_request: response.data.data
            })
        })

    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName,
            data: {
                requests_response_keys: {
                    id: this.state.service_request_id,
                    name: this.state.service_request_name
                },
                service_requests: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                }
            }
        }
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        let queryData = {
            id: this.state.item_id,
            keywords: this.state.keywords,
            provider: this.state.provider,
            limit: this.state.limit,
            request_type: this.state.service_request.service_request_type
        }
        responseHandler(fetchData(ApiConfig.endpoints.serviceApiRequest, queryData),
            this.getRequestCallback);
    }

    getRequestCallback(status, message, data = null) {
        let result;
        if (status === 200) {
            if (data.contentType === "json") {
                result = JSON.stringify(data.requestData, undefined, 4)
            } else if (data.contentType === "xml") {
                result = data.requestData
            }

        } else {
            result = "Error in request..."
        }
        this.setState({
            request: {
                resultString: result
            }
        })
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()} pageName={this.pageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header>Request Test</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={12} md={2} lg={2}>
                                        <Form onSubmit={this.submitHandler}>
                                            {this.state.service_request.service_request_type === "search" &&
                                            <>
                                                <Form.Group controlId="formSearchLimit">
                                                    <Form.Label>Search Limit</Form.Label>
                                                    <Form.Control type={"number"}
                                                                  placeholder="Enter the search limit."
                                                                  onChange={this.formChangeHandler}
                                                                  name="limit"
                                                                  value={this.state.limit}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formSearchQuery">
                                                    <Form.Label>Search Query</Form.Label>
                                                    <Form.Control type={"text"}
                                                                  placeholder="Enter the search query."
                                                                  onChange={this.formChangeHandler}
                                                                  name="keywords"
                                                                  value={this.state.keywords}
                                                    />
                                                </Form.Group>
                                            </>
                                            }
                                            {this.state.service_request.service_request_type === "get" &&
                                            <Form.Group controlId="formParameterName">
                                                <Form.Label>Item ID</Form.Label>
                                                <Form.Control
                                                              placeholder="Enter the item id."
                                                              onChange={this.formChangeHandler}
                                                              name="item_id"
                                                              value={this.state.item_id}
                                                />
                                            </Form.Group>
                                            }
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                                    <Col sm={12} md={10} lg={10}>
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