import Router from 'next/router'
import Auth from '../../views/layouts/Auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {responseHandler} from "../../library/api/middleware";
import Alert from "react-bootstrap/Alert";
import {setSession} from "../../library/session/authenticate";
import React from "react";


const {getToken} = require("../../library/session/authenticate")

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember_me: "",
            response: {
                submitted: false,
                alertStatus: "",
                message: ""
            }
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler(e) {
        e.preventDefault();
        responseHandler(getToken(this.state), this.responseHandler);
    }

    responseHandler(status, message, data = null) {
        let alertStatus = "danger";
        if (status === 200) {
            alertStatus = "success";
            setSession(data)
        }
        this.setState({
            response: {
                submitted: true,
                alertStatus: alertStatus,
                message: message
            }
        });
        if (status === 200) {
            Router.replace('/admin/dashboard')
        }
    }

    render() {
        return (
            <Auth>
                <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {this.state.response.submitted &&
                                <Alert variant={this.state.response.alertStatus}>
                                    {this.state.response.message}
                                </Alert>
                                }
                                <div className="card-group">
                                    <div className="card p-4">
                                        <div className="card-body">
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>

                                            <Form onSubmit={this.submitHandler}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <svg className="c-icon">
                                                        <use xlinkHref="/images/icons/sprites/free.svg#cil-puzzle"/>
                                                      </svg>
                                                    </span>
                                                </div>
                                                <Form.Control type="email" placeholder="Enter email" name="email"
                                                              onChange={this.formChangeHandler}/>
                                            </div>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <svg className="c-icon">
                                                          <use xlinkHref="/images/icons/sprites/free.svg#cil-lock-locked"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <Form.Control type="password" placeholder="Password" name="password"
                                                              onChange={this.formChangeHandler}/>
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <Button bsPrefix={"btn btn-primary px-4"} variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Auth>
        )
    }
}

export default Login;