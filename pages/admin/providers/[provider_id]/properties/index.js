import ApiConfig from "../../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../../views/layouts/Admin";
import ProviderPropertiesForm from "../../../../../views/components/Forms/ProviderPropertiesForm";
import ProviderPropertiesTable from "../../../../../views/components/Tables/ProviderPropertiesTable";
import Col from "react-bootstrap/Col";

const sprintf = require("sprintf-js").sprintf

class ProviderProperties extends React.Component {
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
        this.pageName = "provider_properties";
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
                provider_property: [
                    this.state.provider_id
                ]
            }
        }
    }

    render() {
        return (
            <Admin breadcrumbsConfig={this.getBreadcrumbsConfig()}>
                <>
                    <Col sm={12} md={6} lg={6}>
                    {this.state.showTable &&
                        <ProviderPropertiesTable provider_id={this.state.provider_id}/>
                    }
                    </Col>
                </>
            </Admin>
        )
    }
}

export default ProviderProperties;