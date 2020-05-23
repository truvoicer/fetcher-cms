import ApiConfig from "../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../views/layouts/Admin";
import ProviderPropertiesForm from "../../../../views/components/Forms/ProviderPropertiesForm";
import ProviderPropertiesTable from "../../../../views/components/Tables/ProviderPropertiesTable";

const sprintf = require("sprintf-js").sprintf

class ProviderProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            provider_id: false
        }
    }

    componentDidMount() {
        const {provider_id} = Router.query;
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
                        <ProviderPropertiesTable provider_id={this.state.provider_id}/>
                    }
                </>
            </Admin>
        )
    }
}

export default ProviderProperties;