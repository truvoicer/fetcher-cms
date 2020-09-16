export const ServiceRequestFormData = (
    update = false,
    serviceRequestName = null,
    serviceRequestLabel = null,
) => {
    return {
        fields: [
            {
                name: "service_request_label",
                label: "Service Request Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service request label",
                value: serviceRequestLabel ? serviceRequestLabel : "",
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
                name: "service_request_name",
                label: "Service Request Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service request name",
                value: serviceRequestName ? serviceRequestName : "",
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
                name: "services",
                label: "Service",
                fieldType: "select",
                multi: false
            },
            {
                name: "category",
                label: "Service Categories",
                fieldType: "select",
                multi: false
            },
        ]
    };
}