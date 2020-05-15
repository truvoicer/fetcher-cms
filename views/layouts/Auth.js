import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import App from "../App";

class Auth extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }


    render() {
        return (
            <App>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </App>
        )
    }
}

export default Auth;