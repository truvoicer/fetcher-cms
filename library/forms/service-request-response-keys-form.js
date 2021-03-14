export const ServiceRequestResponseKeysFormData = (
    update = false,
    requestResponseKey = false
) => {
    const serviceResponseKey = requestResponseKey.service_response_key;
    return {
        fields: [
            {
                name: "key_name",
                label: "Key name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key name",
                value: serviceResponseKey.key_name ? serviceResponseKey.key_name : "",
            },
            {
                name: "response_key_value",
                label: "Key Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key value",
                value: requestResponseKey.response_key_value ? requestResponseKey.response_key_value : "",
            },
            {
                label: "Prepend Extra Data?",
                name: "prepend_extra_data",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.prepend_extra_data? requestResponseKey.prepend_extra_data : false,
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
                        value: requestResponseKey.prepend_extra_data_value? requestResponseKey.prepend_extra_data_value : ""
                    },
                ]
            },
            {
                label: "Append Extra Data?",
                name: "append_extra_data",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.append_extra_data? requestResponseKey.append_extra_data : false,
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
                        value: requestResponseKey.append_extra_data_value? requestResponseKey.append_extra_data_value : ""
                    },
                ]
            },
            {
                label: "Show in response?",
                name: "show_in_response",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.show_in_response? requestResponseKey.show_in_response : false,
                checkboxType: "true_false",
            },
            {
                label: "List item??",
                name: "list_item",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.list_item? requestResponseKey.list_item : false,
                checkboxType: "true_false",
            },
            {
                label: "Has array value?",
                name: "has_array_value",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.has_array_value? requestResponseKey.has_array_value : false,
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
                checked: requestResponseKey.is_service_request? requestResponseKey.is_service_request : false,
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