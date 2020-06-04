import React from "react";
import Router from "next/router";
import Admin from "../../../../../views/layouts/Admin";
import ProviderRequestsTable from "../../../../../views/components/Tables/ProviderRequestsTable";
import {GetStaticProps} from 'next';
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/middleware";
import ApiConfig from "../../../../../config/api-config";

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
            provider_id: "",
            provider_name: ""
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
        fetchData(sprintf(ApiConfig.endpoints.provider, provider_id)).then((response) => {
            this.setState({
                provider_id: response.data.data.id,
                provider_name: response.data.data.provider_name
            })
        })
    }

    getBreadcrumbsConfig() {
        return {
            pageName: this.pageName,
            data: {
                service_requests: {
                    id: this.state.provider_id,
                    name: this.state.provider_name
                }
            }
        }
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                <>
                    <Col sm={12} md={12} lg={8}>
                    {this.state.showTable &&
                    <ProviderRequestsTable provider_id={this.state.provider_id}/>
                    }
                    </Col>
                </>
            </Admin>
        )
    }
}

export default ProviderRequests;
