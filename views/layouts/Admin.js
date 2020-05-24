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
    }


    componentDidMount() {
        getApiUser().then((response) => {
            if (response.status !== 200) {
                Router.replace('/auth/login')
                return;
            }
            this.setState(state => ({
                session: {
                    authenticated: true,
                    user: response.data.data
                }
            }));
        })
        .catch((error) => {
            console.error(error)
            Router.replace('/auth/login')

        });
    }

    render() {
        return (
            <App>
                <div className={"c-app"}>
                {this.state.session.authenticated &&
                <UserContext.Provider value={this.state.session}>
                    <AdminSidebar/>
                    <div className="c-wrapper c-fixed-components">
                        <AdminHeader/>
                        <div className="c-body">
                            <main className="c-main">
                                <Container fluid={true}>
                                    <div className="fade-in">
                                        {this.props.children}
                                    </div>
                                </Container>
                            </main>
                            <AdminFooter/>
                        </div>
                    </div>
                </UserContext.Provider>
                }
                </div>
            </App>
        )
    }
}

Admin.contextType = UserContext;
export default Admin;