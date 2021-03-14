import {useRouter} from 'next/router'
import Auth from '../../views/layouts/Auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";
import {setSession} from "../../library/session/authenticate";
import React, {useState} from "react";
import {getToken, responseHandler} from "../../library/api/fetcher-api/fetcher-middleware";
import Head from "next/head";

const Login = (props) => {
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
        responseHandler(getToken({email: email, password: password}), loginResponseHandler);
    }

    const loginResponseHandler = (status, message, data = null) => {
        let alertStatus = "danger";
        if (status === 200) {
            setSession(data.data)
            router.push('/admin/dashboard')
            return;
        }
        setResponse({
            alertStatus: alertStatus,
            message: message
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

export default Login;