import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const dateFormat = require('dateformat');
import DatePicker from "react-datepicker";

const sprintf = require("sprintf-js").sprintf;

export default class ApiTokenForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            apiToken: "",
            expiresAtTimestamp: "",
            expiresAt: "",
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.generateApiToken = this.generateApiToken.bind(this);
    }

    componentDidMount() {
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.getApiToken, this.props.data.itemId)).then((response) => {
                this.setState({
                    id: response.data.data.id,
                    expiresAtTimestamp: new Date(response.data.data.expiresAt).getTime(),
                    apiToken: response.data.data
                })
            })
        }
    }

    formChangeHandler(date) {
        this.setState({
            expiresAtTimestamp: new Date(date).getTime(),
            expiresAt: date
        });
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, sprintf("admin/user/api-token",), this.state), this.props.formResponse);
    }

    generateApiToken(e) {
        e.preventDefault()
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.generateApiToken, this.props.config.userId)), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <Row>
                    {this.state.action === "update" ?
                        <Col>
                            <Form.Group controlId="formApiToken">
                                <p>Token</p>
                                <textarea defaultValue={this.state.apiToken.token} readOnly={true}/>
                            </Form.Group>
                            <Form.Group controlId="formApiTokenExpiryDate">
                                <p>Expiry Date</p>
                                <DatePicker
                                    dateFormat="dd MMMM yyyy H:mm:s"
                                    className={"filter-datepicker"}
                                    selected={this.state.expiresAtTimestamp}
                                    showTimeInput
                                    onChange={this.formChangeHandler}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                        :
                        <Col>
                            <Button variant="primary" onClick={this.generateApiToken}>
                                Generate New Api Token
                            </Button>
                        </Col>
                    }
                </Row>
            </Form>
        );
    }


}
