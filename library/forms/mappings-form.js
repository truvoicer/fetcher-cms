import {isNotEmpty, isSet, uCaseFirst} from "../utils";

export const MappingsFormData = ({
                                     mappings = null,
                                     serviceRequestOptions = [],
                                     providerOptions = [],
                                     categoryOptions = []
                                 }) => {
    let providerValue = {};
    let categoryValue = {};
    let serviceRequestValue = {};

    if (isNotEmpty(mappings?.provider)) {
        providerValue = mappings?.provider.map((provider, index) => {
            return {
                value: provider.id,
                label: provider.provider_label
            }
        })
    }
    if (isNotEmpty(mappings?.category)) {
        categoryValue = mappings?.category.map((category, index) => {
            return {
                value: category.id,
                label: category.category_label
            }
        })
    }
    if (isNotEmpty(mappings?.service_request)) {
        serviceRequestValue = mappings?.service_request.map((service_request, index) => {
            return {
                value: service_request.id,
                label: service_request.service_request_label
            }
        })
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "providers",
                description: "",
                label: "Providers",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: providerOptions,
                data: [],
                value: providerValue,
            },
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "categories",
                description: "",
                label: "Categories",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: categoryOptions,
                data: [],
                value: categoryValue,
            },
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "service_requests",
                description: "",
                label: "Service Requests",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: serviceRequestOptions,
                data: [],
                value: serviceRequestValue,
            },
        ]
    }
}