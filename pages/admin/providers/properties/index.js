import ApiConfig from "../../../../config/api-config";
import React from "react";
import ServiceParametersForm from "../../../../views/components/Forms/ServiceParametersForm";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import Router from "next/router";
import Admin from "../../../../views/layouts/Admin";
import ProviderPropertiesForm from "../../../../views/components/Forms/ProviderPropertiesForm";
import {fetchData, responseHandler, sendData} from "../../../../library/api/middleware";
import Form, {FormRow} from "react-bootstrap/Form";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProviderPropertiesTable from "../../../../views/components/Tables/ProviderPropertiesTable";

const sprintf = require("sprintf-js").sprintf

class ProviderPropertiesIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectLabel: "Select a Provider",
            provider_id: false,
            providers: {},
            selectValue: {}
        }
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.getTable = this.getTable.bind(this);
    }

    componentDidMount() {
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            this.setState({
                providers: this.getProvidersSelect(response.data.data),
            })
        })
    }

    getProvidersSelect(providerData) {
        return providerData.map((item, index) => {
            return {
                value: item.id,
                label: item.provider_name
            }
        })

    }

    selectChangeHandler(e) {
        this.setState({
            selectValue: {value: e.value, label: e.label},
            showTable: true,
            provider_id: e.value
        })
    }

    getTable() {
        return (
            <ProviderPropertiesTable provider_id={this.state.provider_id}/>
        )
    }

    render() {
        return (
            <Admin>
                <>
                    <Form>
                        <Row>
                            <Col sm={12} md={4} lg={4}>
                                <Form.Group controlId="formProvider">
                                    <Form.Label>{this.state.selectLabel}</Form.Label>
                                    <Select
                                        value={this.state.selectValue}
                                        onChange={this.selectChangeHandler} name={"provider_id"}
                                        options={this.state.providers}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <div id={"providerPropertyTable"}>
                    {this.state.showTable &&
                        <this.getTable/>
                    }
                    </div>
                </>
            </Admin>
        )
    }
}

export default ProviderPropertiesIndex;