import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import {getRouteItem} from "../../library/session/authenticate";
import React from "react";
import App from "../App";
import Container from "react-bootstrap/Container";
import Head from 'next/head'
import {SiteConfig} from "../../config/site-config";
import {Routes} from "../../config/routes";
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