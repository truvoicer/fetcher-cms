import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AuthLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }


    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default AuthLayout;