export const ServiceRequestResponseKeysFormData = (
    update = false,
    key_name,
    key_value,
    show_in_response,
    list_item,
    has_array_value,
) => {
    return {
        fields: [
            {
                name: "key_name",
                label: "Key name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key name",
                value: key_name ? key_name : "",
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
                name: "key_value",
                label: "Key Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key value",
                value: key_value ? key_value : "",
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
                label: "Show in response?",
                name: "show_in_response",
                fieldType: "checkbox",
                value: "1",
                checked: show_in_response,
                checkboxType: "true_false",
            },
            {
                label: "List item??",
                name: "list_item",
                fieldType: "checkbox",
                value: "1",
                checked: list_item,
                checkboxType: "true_false",
            },
            {
                label: "Has array value?",
                name: "has_array_value",
                fieldType: "checkbox",
                value: "1",
                checked: has_array_value,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "has_array_value",
                            value: true
                        },
                        name: "return_data_type",
                        label: "Return Data Type",
                        fieldType: "select",
                        multi: false,
                    },
                    {
                        dependsOn: {
                            field: "has_array_value",
                            value: true
                        },
                        name: "array_keys",
                        label: "List",
                        fieldType: "list"
                    },
                ]
            },
        ]
    };
}