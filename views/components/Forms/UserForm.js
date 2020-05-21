import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
const sprintf = require("sprintf-js").sprintf;

export default class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            action: this.props.data.action,
            user_id: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            roles: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            formSubmitted: false
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.getUser, this.props.data.itemId)).then((response) => {
                console.log(response);
                this.setState({
                    user_id: response.data.data.user_id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    password: response.data.data.password,
                    roles: response.data.data.roles
                })
            })
        }
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(sendData(this.state.action, "admin/user", this.state),  this.props.formResponse);
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the email."
                                  onChange={this.formChangeHandler}
                                  name="email"
                                  value={this.state.email}/>
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the username."
                                  onChange={this.formChangeHandler}
                                  name="username"
                                  value={this.state.username}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter the password."
                                  onChange={this.formChangeHandler}
                                  name="password"/>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Confirm password."
                                  onChange={this.formChangeHandler}
                                  name="confirmPassword"/>
                </Form.Group>
                <Form.Group controlId="formRoles">
                    <Form.Label>Roles</Form.Label>
                    {this.roles}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }


}
