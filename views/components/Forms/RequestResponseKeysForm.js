import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const sprintf = require("sprintf-js").sprintf;

class RequestResponseKeysForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.data.action,
            id: "",
            key_name: "",
            key_value: "",
            show_in_response: false,
            list_item: false,
            service_request_id: this.props.config.service_request_id
        };

        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.fetchRequestResponseResponse = this.fetchRequestResponseResponse.bind(this);
    }

    componentDidMount() {
        responseHandler(fetchData(
            sprintf(ApiConfig.endpoints.requestResponseKey, this.props.config.service_request_id, this.props.data.itemId)),
            this.fetchRequestResponseResponse);
    }

    fetchRequestResponseResponse(status, message, data) {
        if (status === 200) {
            console.log(data.data.show_in_response)
            this.setState({
                id: data.data.id,
                key_name: data.data.key_name,
                key_value: data.data.key_value,
                show_in_response: data.data.show_in_response,
                list_item: data.data.list_item
            })
        }
    }

    formChangeHandler(e) {
        let value = e.target.value;
        if ((e.target.id === "show_in_response" && e.target.checked) ||
            (e.target.id === "list_item" && e.target.checked)
        ) {
            value = true;
        } else if ((e.target.id === "show_in_response" && !e.target.checked) ||
                    (e.target.id === "list_item" && !e.target.checked)) {
            value = false;
        }
        this.setState({
            [e.target.name]: value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        console.log(this.state)
        responseHandler(sendData(this.state.action, "service/request/response/key", this.state), this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                <Form.Group>
                    <Form.Label>{this.state.key_name}</Form.Label>
                    <Form.Control
                        name={"key_value"}
                        value={this.state.key_value}
                        onChange={this.formChangeHandler}/>
                </Form.Group>
                <Form.Group controlId="formShowInResponseCheckbox">
                    {/*<Form.Label>Show in Response?</Form.Label>*/}
                    <Form.Check
                        checked={this.state.show_in_response ? "checked" : ""}
                        type={"checkbox"}
                        id={"show_in_response"}
                        label={"Show in Response?"}
                        name="show_in_response"
                        onChange={this.formChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="formListItemCheckbox">
                    <Form.Check
                        checked={this.state.list_item ? "checked" : ""}
                        type={"checkbox"}
                        id={"list_item"}
                        label={"List Item?"}
                        name="list_item"
                        onChange={this.formChangeHandler}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
    }
}

export default RequestResponseKeysForm;