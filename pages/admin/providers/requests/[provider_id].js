import React from "react";
import Router from "next/router";
import Admin from "../../../../views/layouts/Admin";
import ProviderRequestsTable from "../../../../views/components/Tables/ProviderRequestsTable";
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
    }

    componentDidMount() {
        console.log(this.props)
        const {provider_id} = Router.query;
        console.log(provider_id);
        if (!isNaN(provider_id)) {
            this.setState({
                showTable: true,
                provider_id: provider_id
            })
        }
    }

    render() {
        return (
            <Admin>
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
