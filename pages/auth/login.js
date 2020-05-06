import Router from 'next/router'
import AuthLayout from '../../layouts/AuthLayout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const {login} = require("../../library/session/authenticate")

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    async submitHandler(e) {
        e.preventDefault();

        const response = await login(this.state);
        if (response.status === 200) {
            console.log()
            await Router.push("/admin/dashboard");
        }
    }

    render() {
        return (
            <AuthLayout>
                <>
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
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
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
            </AuthLayout>
        )
    }
}

export default Login;