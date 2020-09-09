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
                name: "parameter_value",
                label: "Parameter Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a parameter value",
                value: parameterValue? parameterValue : "",
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
        ]
    };
}