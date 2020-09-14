export const ServiceRequestParameterFormData = (
    update = false,
    parameterName = null,
    parameterValue = null,
) => {
    return {
        fields: [
            {
                name: "parameter_name",
                label: "Parameter name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a parameter name",
                value: parameterName ? parameterName : "",
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
                label: "Parameter Value Type",
                fieldType: "select",
                multi: false,
            },
            {
                dependsOn: {
                    field: "value_types",
                    value: "text"
                },
                name: "parameter_value",
                label: "Parameter Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a parameter value",
                value: parameterValue? parameterValue : "",
            },
            {
                dependsOn: {
                    field: "value_types",
                    value: "textarea"
                },
                name: "parameter_value",
                label: "Parameter Value",
                fieldType: "textarea",
                rows: 4,
                placeHolder: "Enter a parameter value",
                value: parameterValue? parameterValue : "",
            },
        ]
    };
}