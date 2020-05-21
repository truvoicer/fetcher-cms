import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import Breadcrumbs from "../components/Headers/Breadcrumbs";
import {getApiUser} from "../../library/session/authenticate";
import Router from "next/router";
import React from "react";
import App from "../App";
import Container from "react-bootstrap/Container";
import {UserContext} from "../components/Context/UserContext";
import {responseHandler} from "../../library/api/middleware";

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: {
                authenticated: false,
                user: {}
            }
        }
        this.getApiUserResponse = this.getApiUserResponse.bind(this);
    }


    componentDidMount() {
        responseHandler(getApiUser(), this.getApiUserResponse);
    }

    getApiUserResponse(status, message, data) {
        if(status !== 200) {
            Router.replace('/auth/login')
        }
        this.setState(state => ({
            session: {
                authenticated: true,
                user: data.data
            }
        }));
    }

    render() {
        return (
            <App>

                <UserContext.Provider value={this.state.session}>
                <div id="wrapper">
                    <AdminSidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <AdminHeader/>
                            <Container fluid={true}>
                                {this.props.children}
                            </Container>
                        </div>
                        <AdminFooter/>
                    </div>
                </div>
                </UserContext.Provider>
            </App>
        )
    }
}
Admin.contextType = UserContext;
export default Admin;