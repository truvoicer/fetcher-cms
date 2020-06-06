import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import {checkAccessControl, getApiUser, getRouteItem} from "../../library/session/authenticate";
import Router from "next/router";
import React from "react";
import App from "../App";
import Container from "react-bootstrap/Container";
import {UserContext} from "../components/Context/UserContext";
import Head from 'next/head'
import {SiteConfig} from "../../config/site-config";
import {BreadcrumbsContext} from "../components/Context/BreadcrumbsContext";
import {Routes} from "../../config/routes";
import ErrorPage403 from "../components/ErrorPages/403";

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: {
                authenticated: false,
                user: {},
            },
        }
    }


    componentDidMount() {
        getApiUser().then((response) => {
            if (response.status !== 200) {
                Router.replace('/auth/login')
                return;
            }
            if(checkAccessControl(getRouteItem(Routes.items, this.props.pageName), response.data.data)) {
                this.setState(state => ({
                    session: {
                        authenticated: true,
                        user: response.data.data
                    }
                }));
            } else {
            }
        })
        .catch((error) => {
            console.error(error)
            Router.replace('/auth/login')
        });
    }

    render() {
        return (
            <App>
                <Head>
                    <title>{this.props.pageTitle ? this.props.pageTitle : SiteConfig.siteName}</title>
                </Head>
                <div className={"c-app"}>
                {this.state.session.authenticated ?
                <UserContext.Provider value={this.state.session}>
                    <AdminSidebar/>
                    <div className="c-wrapper c-fixed-components">
                        <BreadcrumbsContext.Provider value={this.props.breadcrumbsConfig}>
                        <AdminHeader/>
                        </BreadcrumbsContext.Provider>
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
                :
                    <ErrorPage403 />
                }
                </div>
            </App>
        )
    }
}

Admin.contextType = UserContext;
export default Admin;