
import {withRouter} from "next/router";
import Admin from '../../../views/layouts/Admin'
import React from "react";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.pageName = "dashboard";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
    }
    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName
        }
    }
    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                <>
                    <h1>Dashboard</h1>
                </>
            </Admin>
        )
    }
}