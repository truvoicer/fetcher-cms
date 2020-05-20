import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const sprintf = require("sprintf-js").sprintf;

class RequestParamsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestParams: {},
            form: {
                data: {}
            }
        };

        // this.formSubmitHandler = this.formSubmitHandler.bind(this);
        // this.formResponseHandler = this.formResponseHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchRequestParamsResponse = this.fetchRequestParamsResponse.bind(this);
    }

    componentDidMount() {
        console.log(this.props.data.itemId)
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.apiRequestParameter, this.props.data.itemId)),
            this.fetchRequestParamsResponse);
    }

    fetchRequestParamsResponse(status, message, data) {
        if (status === 200) {
            console.log(data.data)
            this.setState({
                requestParams: data.data
            })
        }
    }

    formResponseHandler(status, message, data) {
        console.log(status, message, data);
    }

    formChangeHandler(e) {
        console.log(e.target.name)
        console.log(e.target.value)
        // e.target.name = e.target.value;
    }

    formSubmitHandler(e) {
        e.preventDefault();

        responseHandler(sendData("create", "provider/properties", data), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>

                <Form.Group as={Row}>
                    <Form.Label column sm="12" md="4">{"Parameter Name"}</Form.Label>
                    <Col column sm={"12"} md={"8"}>
                        <Form.Control
                            value={this.state.requestParams.parameter_name}
                            name={"parameter_name"}
                            onChange={this.formChangeHandler}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="12" md="4">{"Parameter Value"}</Form.Label>
                    <Col column sm={"12"} md={"8"}>
                        <Form.Control
                            value={this.state.requestParams ? this.state.requestParams.parameter_value : ""}
                            data-parameter-id={"parameter_value"}
                            onChange={this.formChangeHandler}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col colums sm={"12"} md={"3"}>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
}

export default RequestParamsForm;