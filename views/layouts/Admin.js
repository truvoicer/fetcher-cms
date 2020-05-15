import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import Breadcrumbs from "../components/Headers/Breadcrumbs";
import {isAuthenticated} from "../../library/session/authenticate";
import Router from "next/router";
import Alert from "react-bootstrap/Alert";
import React from "react";
import App from "../App";
import Container from "react-bootstrap/Container";

class Admin extends React.Component {
    constructor(props) {
        super(props)
    }


    showAlertPopup(alertStatus, alertMessage) {
        this.setState({
            showAlert: true,
            alertStatus: alertStatus,
            alertMessage: alertMessage
        });
    }

    render() {
        return (
            <App>
                <div id="wrapper">
                    <AdminSidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <AdminHeader/>

                            <Container fluid={true}>
                                <Breadcrumbs/>
                                {this.props.children}
                            </Container>
                        </div>
                        <AdminFooter/>
                    </div>
                </div>
            </App>
        )
    }
}

export default Admin;