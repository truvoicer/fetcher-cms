import ApiConfig from '../../../config/api-config'
import React from "react";
import PropertyForm from "../../../views/components/Forms/PropertyForm";
import DataList from "../../../views/components/Tables/DataList";

export default class Properties extends React.Component {
    constructor(props) {
        super(props)

        this.getTableColumnControls = this.getTableColumnControls.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentDidMount() {
    }

    getTableData() {
        return {
            title: ApiConfig.endpoints.propertyList,
            endpoint: ApiConfig.endpoints.propertyList,
            query: {
                count: 10,
                order: "asc",
                sort: "property_name"
            }
        };
    }

    getTableColumns() {
        return [
            {
                name: 'Property Name',
                selector: 'property_name',
                sortable: true,
            },
            {
                name: 'Property label',
                selector: 'property_label',
                sortable: true,
            }
        ];
    }

    getTableColumnControls() {
        return [
            {
                control: "button",
                text: "Edit",
                action: "update",
                modal: {
                    showModal: true,
                    modalTitle: "Edit Property",
                },
                size: "sm",
                classes: "outline-primary"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete Property",
                    endpoint: "property"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }
    getModalConfig() {
        return {
          modalForm: PropertyForm
        };
    }


    render() {
        return (
            <DataList
                tableData={this.getTableData()}
                tableColumns={this.getTableColumns()}
                tableColumnControls={this.getTableColumnControls()}
                modalConfig={this.getModalConfig()}
            />
        )
    }
}