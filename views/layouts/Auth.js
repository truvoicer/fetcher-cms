import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import App from "../App";
import React from "react";

class Auth extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }


    render() {
        return (
            <App>
                <div className={"c-app align-items-center"}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                {this.props.children}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </App>
        )
    }
}

export default Auth;