import Router from 'next/router'
import Auth from '../../views/layouts/Auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {responseHandler} from "../../library/api/middleware";
import Alert from "react-bootstrap/Alert";
import {setSession} from "../../library/session/authenticate";


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
        if(status === 200) {
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
        if(status === 200) {
            console.log("admin")
            Router.replace('/admin/dashboard')
        }
    }
    render() {
        return (
            <Auth>
                <>
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>

                    {this.state.response.submitted &&
                    <Alert variant={this.state.response.alertStatus}>
                        {this.state.response.message}
                    </Alert>
                    }
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.formChangeHandler}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.formChangeHandler}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
            </Auth>
        )
    }
}

export default Login;