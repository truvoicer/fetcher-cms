export const ServiceRequestConfigFormData = (
    update = false,
    itemName = null,
    itemValue = null,
) => {
    return {
        fields: [
            {
                name: "item_name",
                label: "Config Item name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a config item name",
                value: itemName ? itemName : "",
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
                name: "value_types",
                label: "Config Value Type",
                fieldType: "select",
                multi: false,
                subFields: [
                    {
                        dependsOn: {
                            field: "value_types",
                            value: "text"
                        },
                        name: "item_value",
                        label: "Config Item Value",
                        fieldType: "text",
                        type: "text",
                        placeHolder: "Enter a config item value",
                        value: itemValue? itemValue : "",
                    },
                    {
                        dependsOn: {
                            field: "value_types",
                            value: "list"
                        },
                        name: "item_array_value",
                        label: "List",
                        fieldType: "list"
                    },
                ]
            },

        ]
    };
}