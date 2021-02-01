import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import {checkAccessControl, getRouteItem} from "../../library/session/authenticate";
import Router, {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import App from "../App";
import Container from "react-bootstrap/Container";
import {UserContext} from "../components/Context/UserContext";
import Head from 'next/head'
import {SiteConfig} from "../../config/site-config";
import {BreadcrumbsContext} from "../components/Context/BreadcrumbsContext";
import {Routes} from "../../config/routes";
import {getApiUser} from "../../library/api/fetcher-api/fetcher-middleware";

const sprintf = require("sprintf-js").sprintf;

const Admin = (props) => {
    const router = useRouter();
    const [session, setSession] = useState({
        authenticated: false,
        accessDenied: false,
        user: {},
    });

    useEffect(() => {
        getApiUser()
            .then((response) => {
                if (response.status !== 200) {
                    router.replace('/auth/login')
                    return;
                }
                if (checkAccessControl(getRouteItem(Routes.items, props.pageName), response.data.data)) {
                    setSession({
                        authenticated: true,
                        accessDenied: false,
                        user: response.data.data
                    })
                }
            })
            .catch((error) => {
                console.error(error)
                router.replace('/auth/login')
            });
    }, []);

    return (
        <App>
            <Head>
                <title>{props.pageName ? sprintf("%s | %s", SiteConfig.siteName, getRouteItem(Routes.items, props.pageName).label) : SiteConfig.siteName}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={"c-app"}>
                {session.authenticated &&
                <UserContext.Provider value={session}>
                    <AdminSidebar/>
                    <div className="c-wrapper c-fixed-components">
                        <BreadcrumbsContext.Provider value={props.breadcrumbsConfig}>
                            <AdminHeader/>
                        </BreadcrumbsContext.Provider>
                        <div className="c-body">
                            <main className="c-main">
                                <Container fluid={true}>
                                    <div className="fade-in">
                                        {props.children}
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
export default Admin;