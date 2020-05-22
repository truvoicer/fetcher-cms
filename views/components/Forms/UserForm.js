import Form from "react-bootstrap/Form";
import React from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import Button from "react-bootstrap/Button";
import ApiConfig from "../../../config/api-config";
import Alert from "react-bootstrap/Alert";
import Select from 'react-select'

const sprintf = require("sprintf-js").sprintf;

export default class UserForm extends React.Component {
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
            defaultRoles: [
                {
                    value: "ROLE_SUPER_ADMIN",
                    label: "ROLE_SUPER_ADMIN"
                },
                {
                    value: "ROLE_ADMIN",
                    label: "ROLE_ADMIN"
                },
                {
                    value: "ROLE_USER",
                    label: "ROLE_USER"
                },
            ],
            selectedRoles: "",
            formError: {
                showError: false,
                message: ""
            }
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            formSubmitted: false
        })
        if (this.state.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.getUser, this.props.data.itemId)).then((response) => {
                this.setState({
                    user_id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    password: response.data.data.password,
                    selectedRoles: this.getRoles(response.data.data.roles)
                })
            })
        }
    }

    getRoles(roles) {
        return roles.map((item, index) => {

            return {
                value: item,
                label: item
            }
        })
    }

    selectChangeHandler(e) {
        this.setState({
            selectedRoles: e,
        })
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validatePassword(password = "", confirmPassword = "") {
        if (password !== "" || confirmPassword !== "") {
            if (password !== confirmPassword) {
                this.setState({
                    formError: {
                        showError: true,
                        message: "Password and confirm password don't match"
                    }
                })
                return false;
            }
            this.setState({
                formError: {
                    showError: false
                }
            })
            return password;
        }
        return password;
    }

    submitHandler(e) {
        e.preventDefault();
        let userData = {
            user_id: this.state.user_id,
            email: this.state.email,
            username: this.state.username,
        }
        let password = this.validatePassword(this.state.password, this.state.confirmPassword);
        if (password === false) {
            return false;
        }
        if (this.state.user_id === "" && password === "") {
            this.setState({
                formError: {
                    showError: true,
                    message: "Password hasnt been set"
                }
            })
            return false;
        }
        userData.password = password;
        let selectedRoles = this.state.selectedRoles.map((item) => {
            return item.value;
        })
        userData.roles = JSON.stringify(selectedRoles);
        responseHandler(sendData(this.state.action, "admin/user", userData), this.props.formResponse);
    }

    render() {
        return (
            <div>
                {this.state.formError.showError &&
                <Alert variant={"danger"}>
                    {this.state.formError.message}
                </Alert>
                }
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
                                      name="password"
                                      value={this.state.password}/>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Confirm password."
                                      onChange={this.formChangeHandler}
                                      name="confirmPassword"
                                      value={this.state.confirmPassword}/>
                    </Form.Group>
                    <Form.Group controlId="formRoles">
                        <Form.Label>Roles</Form.Label>
                        <Select isMulti={true} options={this.state.defaultRoles} value={this.state.selectedRoles} onChange={this.selectChangeHandler}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }


}
