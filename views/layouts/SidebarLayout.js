import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import {checkAccessControl, getRouteItem} from "../../library/session/authenticate";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import App from "../App";
import Container from "react-bootstrap/Container";
import Head from 'next/head'
import {SiteConfig} from "../../config/site-config";
import {BreadcrumbsContext} from "../components/Context/BreadcrumbsContext";
import {Routes} from "../../config/routes";
import {getApiUser} from "../../library/api/fetcher-api/fetcher-middleware";
import {
    setSessionAuthenticatedAction,
    setSessionAuthenticatingAction,
    setSessionUserAction
} from "../../library/redux/actions/session-actions";
import ProtectedLayout from "./ProtectedLayout";

const sprintf = require("sprintf-js").sprintf;

const SidebarLayout = ({pageName, children}) => {
    return (
        <App>
            <Head>
                <title>{pageName ? sprintf("%s | %s", SiteConfig.siteName, getRouteItem(Routes.items, pageName).label) : SiteConfig.siteName}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>
            <div className={"c-app"}>
                <AdminSidebar pageName={pageName}/>
                <div className="c-wrapper c-fixed-components">
                    <AdminHeader pageName={pageName}/>
                    <div className="c-body">
                        <main className="c-main">
                            <Container fluid={true}>
                                <div className="fade-in">
                                    <ProtectedLayout pageName={pageName}>
                                        {children}
                                    </ProtectedLayout>
                                </div>
                            </Container>
                        </main>
                        <AdminFooter/>
                    </div>
                </div>

            </div>
        </App>
    )
}
export default SidebarLayout;