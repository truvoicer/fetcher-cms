import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ErrorPage403 = (props) => {

    return (
        <Row>
            <Col sm={"12"} md={"12"} lg={"12"}>
                <div className="clearfix">
                    <h1 className="float-left display-3 mr-4">403</h1>
                    <h4 className="pt-3">Access Denied!</h4>
                    <p className="text-muted">You do not have permission to view this page.</p>
                </div>
            </Col>
        </Row>
    )
}

export default ErrorPage403;