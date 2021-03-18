export const ServiceFormData = (
    update = false,
    service = null,
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "service_label",
                label: "Service Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service label",
                value: service?.service_label ? service.service_label : "",
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
                name: "service_name",
                label: "Service Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service name",
                value: service?.service_name ? service.service_name : "",
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