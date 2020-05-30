import React from "react";
import Router from "next/router";
import Admin from "../../../../../views/layouts/Admin";
import ProviderRequestsTable from "../../../../../views/components/Tables/ProviderRequestsTable";
import {GetStaticProps} from 'next';

const sprintf = require("sprintf-js").sprintf

class ProviderRequests extends React.Component {
    static async getInitialProps(ctx) {
        return {
            props: {

            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            provider_id: false
        }
        this.pageName = "service_requests";
        this.getBreadcrumbsConfig = this.getBreadcrumbsConfig.bind(this);
    }

    componentDidMount() {
        const {provider_id} = Router.query;
        this.setState({
            showTable: true,
            provider_id: provider_id
        })
    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName,
            data: {
                manage_provider: [
                    this.state.provider_id
                ]
            }
        }
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                <>
                    {this.state.showTable &&
                    <ProviderRequestsTable provider_id={this.state.provider_id}/>
                    }
                </>
            </Admin>
        )
    }
}

export default ProviderRequests;