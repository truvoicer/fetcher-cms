import {useRouter} from 'next/router'
import Auth from '../../views/layouts/Auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";
import {getRouteItem, setSession} from "../../library/session/authenticate";
import React, {useState} from "react";
import {getToken, responseHandler} from "../../library/api/fetcher-api/fetcher-middleware";
import Head from "next/head";
import {SESSION_LOGIN_REDIRECT, SESSION_STATE_KEY} from "../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {isNotEmpty} from "../../library/utils";
import {Routes} from "../../config/routes";

const Login = ({session}) => {
    Login.PageName = "login";

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({
        alertStatus: "",
        message: ""
    });

    const formChangeHandler = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        getToken({
            requestData: {email: email, password: password},
            onSuccess: (responseData) => {
                setSession(responseData.data)
                if (isNotEmpty(session[SESSION_LOGIN_REDIRECT])) {
                    console.log(session[SESSION_LOGIN_REDIRECT])
                    router.push(session[SESSION_LOGIN_REDIRECT])
                    return;
                }
                const sessionRedirectUrl = localStorage.getItem("redirect_url")
                if (isNotEmpty(sessionRedirectUrl)) {
                    console.log(sessionRedirectUrl)
                    router.push(sessionRedirectUrl)
                }
                console.log(getRouteItem(Routes.items, "dashboard").route)
                router.push(getRouteItem(Routes.items, "dashboard").route);
            },
            onError: (error) => {
                setResponse({
                    alertStatus: "danger",
                    message: error?.response?.data?.message || error?.response?.message || "Error logging in"
                })
            }
        })
    }

    return (
        <>
            <Head>
                <title>Fetcher CMS | Login</title>
            </Head>
            <Auth>
                <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {response.alertStatus === "danger" &&
                                <Alert variant={response.alertStatus}>
                                    {response.message}
                                </Alert>
                                }
                                <div className="card-group">
                                    <div className="card p-4">
                                        <div className="card-body">
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>

                                            <Form onSubmit={submitHandler}>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <svg className="c-icon">
                                                        <use xlinkHref="/images/icons/sprites/free.svg#cil-puzzle"/>
                                                      </svg>
                                                    </span>
                                                    </div>
                                                    <Form.Control type="email" placeholder="Enter email" name="email"
                                                                  onChange={formChangeHandler}/>
                                                </div>
                                                <div className="input-group mb-4">
                                                    <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <svg className="c-icon">
                                                          <use
                                                              xlinkHref="/images/icons/sprites/free.svg#cil-lock-locked"/>
                                                        </svg>
                                                    </span>
                                                    </div>
                                                    <Form.Control type="password" placeholder="Password" name="password"
                                                                  onChange={formChangeHandler}/>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Button bsPrefix={"btn btn-primary px-4"} variant="primary"
                                                                type="submit">
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
        </>
    )
}

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    }
}
export default connect(
    mapStateToProps,
    null
)(Login)