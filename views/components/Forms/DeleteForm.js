import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {sendData, responseHandler} from "../../../library/api/middleware";
import React from "react";

class DeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "",
            item_id: ""
        }
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        let itemIdName = this.props.data.endpoint + "_id";
        let data = this.props.data;
        data[itemIdName] = this.props.data.itemId;
        console.log(data)
        responseHandler(sendData("delete", this.props.data.endpoint, data), this.props.formResponse);
    }
    render() {
        return (
            <Row>
                <Col>
                    <Button variant="primary">Cancel</Button>
                    <Button variant="danger" onClick={this.deleteItem} >Confirm</Button>
                </Col>
            </Row>
        )
    }
}

export default DeleteForm;