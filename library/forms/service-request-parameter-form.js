export const ServiceRequestParameterFormData = (
    update = false,
    serviceRequestParameter = null,
    textTypeOptions
) => {
    let textType = {
        label: "Text",
        value: "text"
    };
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "parameter_name",
                label: "Parameter name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a parameter name",
                value: serviceRequestParameter?.parameter_name ? serviceRequestParameter.parameter_name : "",
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
                label: "Parameter Value Type",
                fieldType: "select",
                multi: false,
                options: textTypeOptions,
                value: textType
            },
            {
                dependsOn: {
                    field: "value_types",
                    value: "text"
                },
                rowIndex: 2,
                columnIndex: 0,
                name: "parameter_value",
                label: "Parameter Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a parameter value",
                value: serviceRequestParameter?.parameter_value ? serviceRequestParameter.parameter_value : "",
            },
            {
                dependsOn: {
                    field: "value_types",
                    value: "textarea"
                },
                rowIndex: 3,
                columnIndex: 0,
                name: "parameter_value",
                label: "Parameter Value",
                fieldType: "textarea",
                rows: 4,
                placeHolder: "Enter a parameter value",
                value: serviceRequestParameter?.parameter_value ? serviceRequestParameter.parameter_value : "",
            },
        ]
    };
}