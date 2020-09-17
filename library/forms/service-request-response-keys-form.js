export const ServiceRequestResponseKeysFormData = (
    update = false,
    key_name = null,
    key_value = null,
    show_in_response = false,
    list_item = false,
    has_array_value = false,
    prepend_extra_data = false,
    prepend_extra_data_value = null,
    append_extra_data = false,
    append_extra_data_value = null,
    is_service_request = false
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
            },
            {
                name: "key_value",
                label: "Key Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key value",
                value: key_value ? key_value : "",
            },
            {
                label: "Prepend Extra Data?",
                name: "prepend_extra_data",
                fieldType: "checkbox",
                value: "1",
                checked: prepend_extra_data,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "prepend_extra_data",
                            value: true
                        },
                        name: "prepend_extra_data_value",
                        label: "Prepend Extra Data Value",
                        type: "text",
                        fieldType: "text",
                        placeHolder: "Enter extra data to prepend",
                        value: prepend_extra_data_value? prepend_extra_data_value : ""
                    },
                ]
            },
            {
                label: "Append Extra Data?",
                name: "append_extra_data",
                fieldType: "checkbox",
                value: "1",
                checked: append_extra_data,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "append_extra_data",
                            value: true
                        },
                        name: "append_extra_data_value",
                        label: "Append Extra Data Value",
                        type: "text",
                        fieldType: "text",
                        placeHolder: "Enter extra data to append",
                        value: append_extra_data_value? append_extra_data_value : ""
                    },
                ]
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
            {
                label: "Is a service request?",
                name: "is_service_request",
                fieldType: "checkbox",
                value: "1",
                checked: is_service_request,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "is_service_request",
                            value: true
                        },
                        name: "response_key_request_item",
                        label: "Service Request",
                        fieldType: "select",
                        multi: false,
                    },
                ]
            },
        ]
    };
}