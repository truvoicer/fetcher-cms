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
            form: {
                parameterGroups: "",
                paramText: 0,
                data: {}
            }
        };

        this.paramNum = 0;
        this.paramFormGroups = [];
        // this.formSubmitHandler = this.formSubmitHandler.bind(this);
        // this.formResponseHandler = this.formResponseHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchRequestParamsResponse = this.fetchRequestParamsResponse.bind(this);
        this.buildFields = this.buildFields.bind(this);
        this.newParamFormGroup = this.newParamFormGroup.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(ApiConfig.endpoints.apiProviderRequestParams,
            {
                provider_id: this.props.providerId,
                api_request_id: this.props.requestId
            }),
            this.fetchRequestParamsResponse);
    }

    fetchRequestParamsResponse(status, message, data) {
        if (status === 200) {
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

    paramFormGroup(item = null) {
        return (
            <div>
                <Form.Group as={Row}>
                    <Form.Label column sm="12" md="4">{"Parameter Name"}</Form.Label>
                    <Col column sm={"12"} md={"8"}>
                        <Form.Control
                            value={item ? item.parameter_name : ""}
                            data-parameter-id={item ? item.id : ""}
                            onChange={this.formChangeHandler}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="12" md="4">{"Parameter Value"}</Form.Label>
                    <Col column sm={"12"} md={"8"}>
                        <Form.Control
                            value={item ? item.parameter_value : ""}
                            data-parameter-id={item ? item.id : ""}
                            onChange={this.formChangeHandler}/>
                    </Col>
                </Form.Group>
            </div>
        );
    }

    newParamFormGroup() {
        this.paramFormGroups.push(this.paramFormGroup());
        this.setState({
            form: {
                parameterGroups: this.paramFormGroups
            }
        })
    }

    buildFields() {
        if (this.state.requestParams) {
            let requestParams = this.state.requestParams;
            return requestParams.map((item, index) => {
                return (
                    this.paramFormGroup(item)
                );
            })
        } else {
            return (
                <p>No items found</p>
            )
        }
    }


    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                {this.state.form.paramText}
                <div id={"parameter-form-groups"}>
                    <this.buildFields/>
                    {this.state.form.parameterGroups}
                </div>

                <Form.Group as={Row}>
                    <Col colums sm={"12"} md={"5"}>
                        <Button variant="primary" type="button" onClick={this.newParamFormGroup}>
                            New Parameter
                        </Button>
                    </Col>
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