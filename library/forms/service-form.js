export const ServiceFormData = (
    update = false,
    service_label = null,
    service_name = null,
) => {
    return {
        fields: [
            {
                name: "service_label",
                label: "Service Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service label",
                value: service_label ? service_label : "",
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
                name: "service_name",
                label: "Service Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service name",
                value: service_name ? service_name : "",
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
                name: "categories",
                label: "Service Categories",
                fieldType: "select",
                multi: false
            },
        ]
    };
}