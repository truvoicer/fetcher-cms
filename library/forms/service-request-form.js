import {isSet} from "../utils";

export const ServiceRequestFormData = (
    update = false,
    serviceRequest = null,
    services = null,
    categories = null,
) => {
    let serviceValue = {};
    let categoriesValue = {};
    if (isSet(serviceRequest?.service) && serviceRequest?.service !== null) {
        serviceValue = {
                value: serviceRequest.service.id,
                label: serviceRequest.service.service_label
        };
    }
    if (isSet(serviceRequest?.category) && serviceRequest?.category !== null) {
        categoriesValue = {
                value: serviceRequest.category.id,
                label: serviceRequest.category.category_label
        };
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "service_request_label",
                label: "Service Request Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service request label",
                value: serviceRequest?.service_request_label ? serviceRequest.service_request_label : "",
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
                name: "service_request_name",
                label: "Service Request Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a service request name",
                value: serviceRequest?.service_request_name ? serviceRequest.service_request_name : "",
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
                rowIndex: 2,
                columnIndex: 0,
                name: "services",
                label: "Service",
                fieldType: "select",
                multi: false,
                options: services,
                value: serviceValue
            },
            {
                rowIndex: 3,
                columnIndex: 0,
                name: "category",
                label: "Service Categories",
                fieldType: "select",
                multi: false,
                options: categories,
                value: categoriesValue
            },
        ]
    };
}