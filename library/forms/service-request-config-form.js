import {isNotEmpty} from "../utils";
import {buildFormListSelectedValueType} from "../api/helpers/api-helpers";

export const ServiceRequestConfigFormData = (
    update = false,
    serviceRequestConfig = null,
    valueTypes = [],
) => {
    let selectedValueType = {
        label: "Text",
        value: "text"
    };
    let itemArrayValue = [];
    if (isNotEmpty(serviceRequestConfig?.value_type)) {
        selectedValueType = buildFormListSelectedValueType(serviceRequestConfig.value_type);
    }
    if (serviceRequestConfig.item_array_value !== null && serviceRequestConfig.item_array_value !== "") {
        itemArrayValue = serviceRequestConfig.item_array_value;
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "item_name",
                label: "Config Item name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a config item name",
                value: serviceRequestConfig?.item_name ? serviceRequestConfig.item_name : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 2,
                            max: 50
                        }
                    ]
                }
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "value_types",
                label: "Config Value Type",
                fieldType: "select",
                multi: false,
                value: selectedValueType,
                options: valueTypes,
                subFields: [
                    {
                        dependsOn: {
                            field: "value_types",
                            value: "text"
                        },
                        rowIndex: 0,
                        columnIndex: 0,
                        name: "item_value",
                        label: "Config Item Value",
                        fieldType: "text",
                        type: "text",
                        placeHolder: "Enter a config item value",
                        value: serviceRequestConfig?.item_value ? serviceRequestConfig.item_value : "",
                    },
                    {
                        dependsOn: {
                            field: "value_types",
                            value: "list"
                        },
                        rowIndex: 1,
                        columnIndex: 0,
                        name: "item_array_value",
                        label: "List",
                        fieldType: "form_list",
                        listItemKeyLabel: "Key",
                        listItemValueLabel: "Value",
                        addRowLabel: "Add New",
                        value: itemArrayValue,
                    },
                ]
            },

        ]
    };
}